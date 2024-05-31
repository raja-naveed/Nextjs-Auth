import { auth } from "@/auth";

export default async function Home() {
  console.log("auth");
  const session = await auth();
const user = session?.user;
  console.log("session", session);
  console.log("user", user);



  return (
    <p>
      Hi
    </p>
  );
}
