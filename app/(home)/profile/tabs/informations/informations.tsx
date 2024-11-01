import { IUser } from "@models/user";
import './informations.scss';

interface IProfileInformationsTabProps {
  profile?: IUser;
}

export default function ProfileInformationsTab ({ profile }: IProfileInformationsTabProps) {
  return (
    <div className='profile-informations'>
      <h2 className='profile-informations-title'>Informations</h2>
      <div>Email : {profile?.email}</div>
    </div>
  )
}