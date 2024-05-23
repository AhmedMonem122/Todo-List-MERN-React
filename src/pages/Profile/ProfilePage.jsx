import useAuth from "../../hooks/use-auth";

const ProfilePage = () => {
  const { userData } = useAuth();

  return (
    <div className="container mx-auto">
      <div className="lg:w-1/2 my-[50px] mx-auto p-[20px] rounded-2xl bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080]">
        <div className="flex items-center justify-center text-center font-semibold  md:text-3xl mb-10 text-white">
          First Name: {userData?.firstName}
        </div>
        <div className="flex items-center justify-center text-center font-semibold  md:text-3xl mb-10 text-white">
          Last Name: {userData?.lastName}
        </div>
        <div className="flex items-center justify-center text-center font-semibold  md:text-3xl mb-10 text-white">
          Email: {userData?.email}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
