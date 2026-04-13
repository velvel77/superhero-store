import { db } from "@/lib/db/index";
import type { Superhero, SuperheroFormData } from "@/lib/types";

type AvailabilityFilter = "" | "available" | "unavailable";
type RankingFilter = "" | "S" | "A" | "B" | "C" | "D" | "E" | "F";

type GetSuperheroesParams = {
	page?: number;
	limit?: number;
	q?: string;
	ranking?: RankingFilter;
	availability?: AvailabilityFilter;
};

export async function getSuperheroes({
	page = 1,
	limit = 5,
	q = "",
	ranking = "",
	availability = "",
}: GetSuperheroesParams = {}): Promise<Superhero[]> {
	const offset = (page - 1) * limit;

	const { whereClause, values } = buildSuperheroFilters({
		q,
		ranking,
		availability,
	});

	values.push(limit);
	values.push(offset);

	const res = await db.query(
		`
    SELECT *
    FROM superheroes
    ${whereClause}
    ORDER BY
      CASE ranking
        WHEN 'S' THEN 1
        WHEN 'A' THEN 2
        WHEN 'B' THEN 3
        WHEN 'C' THEN 4
        WHEN 'D' THEN 5
        WHEN 'E' THEN 6
        WHEN 'F' THEN 7
        ELSE 8
      END,
      joined_at DESC
    LIMIT $${values.length - 1} OFFSET $${values.length}
    `,
		values,
	);

	return res.rows;
}

export async function getSuperheroesCount({
	q = "",
	ranking = "",
	availability = "",
}: {
	q?: string;
	ranking?: RankingFilter;
	availability?: AvailabilityFilter;
} = {}): Promise<number> {
	const { whereClause, values } = buildSuperheroFilters({
		q,
		ranking,
		availability,
	});

	const res = await db.query(
		`
    SELECT COUNT(*)::int AS count
    FROM superheroes
    ${whereClause}
    `,
		values,
	);

	return res.rows[0].count;
}

export async function getSuperheroById(id: number): Promise<Superhero> {
	const res = await db.query(
		`
    SELECT *
    FROM superheroes
    WHERE id = $1
    `,
		[id],
	);

	return res.rows[0];
}

export async function addSuperhero(
	superhero: SuperheroFormData,
): Promise<Superhero> {
	const res = await db.query(
		`
    INSERT INTO superheroes (
      name,
      price,
      description,
      superpowers,
      stats,
      image_url,
      is_available,
      joined_at,
      ranking
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, $8)
    RETURNING *;
    `,
		[
			superhero.name,
			superhero.price,
			superhero.description,
			superhero.superpowers,
			superhero.stats,
			superhero.image_url,
			superhero.is_available,
			superhero.ranking,
		],
	);

	return res.rows[0];
}

export async function updateSuperheroById(
	id: number,
	superhero: SuperheroFormData,
): Promise<Superhero> {
	const res = await db.query(
		`
    UPDATE superheroes
    SET
      name = $1,
      price = $2,
      description = $3,
      superpowers = $4,
      stats = $5,
      image_url = $6,
      is_available = $7,
      ranking = $8
    WHERE id = $9
    RETURNING *;
    `,
		[
			superhero.name,
			superhero.price,
			superhero.description,
			superhero.superpowers,
			superhero.stats,
			superhero.image_url,
			superhero.is_available,
			superhero.ranking,
			id,
		],
	);

	return res.rows[0];
}

export async function deleteSuperheroById(id: number): Promise<void> {
	await db.query(
		`
    DELETE FROM superheroes
    WHERE id = $1
    `,
		[id],
	);
}

function buildSuperheroFilters({
	q = "",
	ranking = "",
	availability = "",
}: {
	q?: string;
	ranking?: RankingFilter;
	availability?: AvailabilityFilter;
}) {
	const conditions: string[] = [];
	const values: (string | number | boolean)[] = [];

	if (q.trim()) {
		values.push(`%${q.trim()}%`);
		conditions.push(
			`(name ILIKE $${values.length} OR description ILIKE $${values.length} OR superpowers ILIKE $${values.length})`,
		);
	}

	if (ranking) {
		values.push(ranking);
		conditions.push(`ranking = $${values.length}`);
	}

	if (availability === "available") {
		conditions.push(`is_available = true`);
	} else if (availability === "unavailable") {
		conditions.push(`is_available = false`);
	}

	const whereClause = conditions.length
		? `WHERE ${conditions.join(" AND ")}`
		: "";

	return { whereClause, values };
}
