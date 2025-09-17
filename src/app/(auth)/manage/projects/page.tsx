import { getCurrentUser } from "@/libs/api/auth";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      Manage Project Page!
      <br />
      {JSON.stringify(user)}
    </div>
  );
};

export default page;
