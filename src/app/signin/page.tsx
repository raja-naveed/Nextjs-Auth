import { signIn } from "@/auth";
import { connectDatabase } from "@/libs/utils";
import User from "@/model/userModel";
import { compare } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const SignInForm = () => {
    const LoginHandler = async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Connect to Database 
        await connectDatabase();

        if (!email || !password) return alert("Please Provide Email and Password");
        try {
            await signIn("credentials", {
                email,
                password,
                redirect:true,
                redirectTo: "/"

            })
            
        } catch (error) {
            const err = error as CredentialsSignin;
            return err.message;
            
        }

        // Assuming you set up a session or JWT for user authentication
        // Example: set a session cookie or redirect to a dashboard
        // For now, we just redirect to a placeholder "/dashboard"
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sign In</h2>
                <form action={LoginHandler} method="POST">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignInForm;
