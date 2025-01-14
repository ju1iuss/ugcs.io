import { Brain, Zap, Shield } from 'lucide-react';

export function Problems() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-24">
      <div className="text-center mb-16">
        <div className="text-sm font-medium text-red-500 mb-3">PROBLEM</div>
        <h2 className="text-4xl font-semibold">
          Manuelle Videoproduktion ist mühsam und zeitaufwendig.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Ressourcen-Überlastung</h3>
          <p className="text-gray-600">
            Unternehmen kämpfen mit der Produktion von qualitativ hochwertigen Videos und verschwenden wertvolle Zeit und Ressourcen.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Langsame Umsetzung</h3>
          <p className="text-gray-600">
            Traditionelle Videoproduktion ist zu langsam, wodurch Unternehmen wichtige Marktchancen verpassen.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Qualitätssicherung</h3>
          <p className="text-gray-600">
            Die Gewährleistung konsistenter Videoqualität und Markenbotschaft ist bei manueller Produktion eine große Herausforderung.
          </p>
        </div>
      </div>
    </section>
  );
} 