import { connectDatabase } from "@/libs/utils";
import User from "@/model/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

const Form = () => {
    const signUp = async (formData: FormData) => {
        "use server";
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Connect to Database 
        await connectDatabase();

        if (!name || !email || !password)
            return alert("Please Provide Name, Email and Password");
        const user = await User.findOne({ email });

        if (user)
            return alert("User Already Exists");

        const hasedPassword = await hash(password, 12);

        await User.create({ name, email, password: hasedPassword });

        redirect("/signin");

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sign Up</h2>
                <form action={
                    signUp}
                    method="POST">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
                        <select id="role" name="role" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div> */}
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Form;