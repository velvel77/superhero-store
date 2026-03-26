import { LogOut, Settings, User } from "lucide-react";


export default function ProfileDropdown() {
  return (
    <ul className="absolute left-58 bottom-0 flex flex-col gap-1 p-2 bg-basic-900 border border-ui-border rounded-md text-basic-300">
      <li className="flex flex-row justify-between gap-4 text-sm hover:bg-primary-500 hover:text-basic-900 p-4 rounded-md">Profile <User height={18} width={18}/></li>
      <li className="flex flex-row justify-between gap-4 text-sm hover:bg-primary-500 hover:text-basic-900 p-4 rounded-md">Settings <Settings height={18} width={18}/></li>
      <li className="flex flex-row justify-between gap-4 text-sm hover:bg-primary-500 hover:text-basic-900 p-4 rounded-md">Logout <LogOut height={18} width={18}/></li>
    </ul>
  )
}
