import { getCurrentUser } from "@/libs/api/auth";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      Dashboard Page!
      <br />
      {JSON.stringify(user)}
    </div>
  );
};

export default page;
