
interface UserProfileProps {
  onLogout: () => void
}

const UserProfile = ({onLogout}:UserProfileProps) => {  

  return (
    <>
      <div>UserProfile</div>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default UserProfile;
