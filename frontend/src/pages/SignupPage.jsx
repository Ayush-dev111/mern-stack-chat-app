import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AnimatedBorderContainer from "../components/AnimatedBorderContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import signupImage from "../assets/signup.png"

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-4xl md:h-[550px]">
      <AnimatedBorderContainer>
        <div className="w-full flex flex-col md:flex-row ">
          {/* form column- left side */}
          <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
             <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-4">
                <MessageCircleIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <h2 className="text-xl font-bold text-slate-200 mb-2">Create Account</h2>
                <p className="text-slate-400">Sign up for a new account</p>
              </div>
              {/* form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="auth-input-label">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon"/>
                    <input
                     type="text" 
                     value= {formData.fullName}
                     onChange={(e)=> setFormData({...formData, fullName: e.target.value})}
                     className="input"
                     placeholder="Enter your fullname..."
                     />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="auth-input-label">
                    Email
                  </label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon"/>
                    <input
                     type="email" 
                     value= {formData.email}
                     onChange={(e)=> setFormData({...formData, email: e.target.value})}
                     className="input"
                     placeholder="Enter your email..."
                     />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="auth-input-label">
                    Password
                  </label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon"/>
                    <input
                     type="password" 
                     value= {formData.password}
                     onChange={(e)=> setFormData({...formData, password: e.target.value})}
                     className="input"
                     placeholder="Enter your password..."
                     />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
              </form>
              
              <div className="mt-4 text-center">
                <Link to="/login" className="auth-link">
                Already have an account? Login
                </Link>
              </div>
          </div>
        </div>
        {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src={signupImage}
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </AnimatedBorderContainer>
      </div>
    </div>
  )
}
export default SignUpPage;