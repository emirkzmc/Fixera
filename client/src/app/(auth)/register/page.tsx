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
import { useRegisterMutation } from "@/hooks/auth/useAuthMutation";

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

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const registerMutation = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !workshopName || !password) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      await registerMutation.mutateAsync({ fullName, email, workshopName, password });
      toast.success("Kayıt işlemi başarılı! Lütfen giriş yapınız.");
      router.push("/login");
    } catch (error: any) {
      // Global error handler picks up generic errors
    }
  };

  return (
    <>
      <AuthSplitLayout>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Hesap oluştur</h2>

          <motion.form 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="w-full space-y-5"
          >
            {/* Ad Soyad */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={registerMutation.isPending}
              />
            </motion.div>

            {/* E-posta */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="email">E-posta</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={registerMutation.isPending}
              />
            </motion.div>
            
            {/* Firma Adı (Workshop Name) */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <Label htmlFor="workshopName">Firma Adı</Label>
              <Input 
                type="text" 
                id="workshopName" 
                placeholder="Örn: Emir Oto Tamir" 
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                disabled={registerMutation.isPending}
              />
            </motion.div>

            {/* Şifre */}
            <motion.div variants={itemVariants} className="space-y-1.5 relative">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={registerMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  disabled={registerMutation.isPending}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <Button type="submit" fullWidth disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
              </Button>
              
              {/* Terms and Conditions Text */}
              <p className="text-[11px] sm:text-xs text-slate-400 text-center mt-4">
                Hesap oluşturarak{" "}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="cursor-pointer underline hover:text-orange-500 transition-colors focus:outline-none"
                >
                  Şartlar ve Koşulları
                </button>{" "}
                kabul etmiş olursunuz.
              </p>
            </motion.div>

            {/* Bottom link */}
            <motion.div variants={itemVariants} className="text-center pt-4">
              <p className="text-sm text-slate-500">
                Zaten bir hesabınız var mı?{" "}
                <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  Giriş yap
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
