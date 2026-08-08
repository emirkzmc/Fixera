import React from "react";
import { Modal } from "@/components/ui/Modal";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Şartlar ve Koşullar" maxWidth="max-w-3xl">
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <section>
          <h4 className="text-base font-semibold text-slate-800 mb-2">1. Taraflar ve Kapsam</h4>
          <p>
            İşbu Şartlar ve Koşullar Sözleşmesi ("Sözleşme"), Fixera (Bundan böyle "Hizmet Sağlayıcı" olarak anılacaktır) ile Fixera platformuna kayıt olan ve hizmetleri kullanan oto tamir servisi / işletme ("Kullanıcı") arasında akdedilmiştir. Fixera'ya üye olarak veya platformu kullanarak bu şartları tamamen okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
          </p>
        </section>

        <section>
          <h4 className="text-base font-semibold text-slate-800 mb-2">2. Hizmetin Tanımı</h4>
          <p>
            Fixera, B2B otomotiv tamir ve servis işletmeleri için geliştirilmiş bulut tabanlı bir SaaS (Hizmet olarak Yazılım) çözümüdür. Kullanıcılara iş emri yönetimi, stok takibi, müşteri ilişkileri ve finansal işlemlerini yönetme imkanı sunar. Hizmet Sağlayıcı, önceden bildirmeksizin sistem özelliklerinde değişiklik yapma, ekleme veya çıkarma hakkını saklı tutar.
          </p>
        </section>

        <section>
          <h4 className="text-base font-semibold text-slate-800 mb-2">3. Kullanıcı Yükümlülükleri</h4>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Kullanıcı, sisteme girilen müşteri verilerinin, stok ve finansal bilgilerin doğruluğundan bizzat sorumludur.</li>
            <li>Hesap güvenliği ve şifrelerin korunması Kullanıcı'nın sorumluluğundadır. Kayıp veya çalıntı şifrelerden kaynaklanan zararlardan Hizmet Sağlayıcı sorumlu tutulamaz.</li>
            <li>Sistem altyapısına zarar verecek, aşırı yük bindirecek veya tersine mühendislik (reverse engineering) yapacak her türlü eylem kesinlikle yasaktır.</li>
          </ul>
        </section>

        <section>
          <h4 className="text-base font-semibold text-slate-800 mb-2">4. Veri Gizliliği ve KVKK İzni</h4>
          <p>
            Fixera, Kullanıcı'nın platforma yüklediği verileri (müşteri bilgileri, araç kayıtları vb.) güvende tutmayı taahhüt eder. Kullanıcı, sisteme girdiği kişisel verilerin KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında kendi sorumluluğunda olduğunu, gerekli açık rıza metinlerini son kullanıcılardan aldığını beyan eder. Fixera, sadece platformun çalışabilmesi için gerekli verileri sunucularında barındırır.
          </p>
        </section>

        <section>
          <h4 className="text-base font-semibold text-slate-800 mb-2">5. Fikri Mülkiyet Hakları</h4>
          <p>
            Fixera platformunun yazılımı, tasarımı, logoları, algoritmaları ve tüm fikri mülkiyet hakları Hizmet Sağlayıcı'ya aittir. Sözleşme kapsamında Kullanıcı'ya sadece platformu kullanma hakkı (lisansı) verilir; hiçbir mülkiyet hakkı devredilmez.
          </p>
        </section>

        <section>
          <h4 className="text-base font-semibold text-slate-800 mb-2">6. Sözleşmenin Feshi</h4>
          <p>
            Taraflar, istedikleri zaman hesap kapatma talebinde bulunarak bu sözleşmeyi feshedebilir. Kullanıcı'nın bu şartları ihlal etmesi durumunda, Hizmet Sağlayıcı hesabı askıya alma veya kalıcı olarak silme hakkına sahiptir.
          </p>
        </section>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Okudum ve Anladım
          </button>
        </div>
      </div>
    </Modal>
  );
}
