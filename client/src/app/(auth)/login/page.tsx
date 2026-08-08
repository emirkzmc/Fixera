"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { toast } from "react-hot-toast";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { TermsModal } from "@/components/auth/TermsModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useLoginMutation } from "@/hooks/auth/useAuthMutation";

// Framer motion variants for staggered form items
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  
  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Lütfen e-posta ve şifrenizi giriniz.");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      toast.success("Giriş başarılı, yönlendiriliyorsunuz...");
      router.push("/");
    } catch (error: any) {
      // Global error handler in React Query will catch generic errors,
      // but we can also log or handle specific UI updates here if needed.
    }
  };

  return (
    <>
      <AuthSplitLayout>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Giriş yap</h2>

          <motion.form 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="w-full space-y-5"
          >
            {/* E-posta */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="email">E-posta</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginMutation.isPending}
              />
            </motion.div>

            {/* Şifre */}
            <motion.div variants={itemVariants} className="space-y-1.5 relative">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Şifre</Label>
                <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
                  Şifremi unuttum
                </Link>
              </div>
              
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button type="submit" fullWidth disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş yap"}
              </Button>
              
              {/* Terms and Conditions Text */}
              <p className="text-[11px] sm:text-xs text-slate-400 text-center mt-4 px-2">
                Giriş yaparak{" "}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="underline hover:text-orange-500 transition-colors focus:outline-none"
                >
                  Şartlar ve Koşulları
                </button>{" "}
                kabul etmiş olursunuz.
              </p>
            </motion.div>

            {/* Bottom link */}
            <motion.div variants={itemVariants} className="text-center pt-4">
              <p className="text-sm text-slate-500">
                Henüz bir hesabınız yok mu?{" "}
                <Link href="/register" className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  Kayıt ol
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </div>
      </AuthSplitLayout>
      
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
