'use client';

import { useActionState } from 'react';
import { submitContactForm, State } from '../api/contact/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
  const initialState: State = {
    message: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="h-screen flex items-center justify-center" aria-label="Page de contact">
      <div className="w-full max-w-[400px] p-6 bg-white text-black rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Contactez-nous</h2>

        <form action={formAction} className="flex flex-col gap-4" aria-label="Formulaire de contact">
          {/* Champ : Nom */}
          <div aria-label="Saisie de votre nom">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
          </div>

          {/* Champ : Email */}
          <div aria-label="Saisie de votre email">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
          </div>

          {/* Champ : Téléphone */}
          <div aria-label="Saisie de votre numéro de téléphone">
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <Input
              type="text"
              id="telephone"
              name="telephone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Champ : Message */}
          <div aria-label="Saisie de votre demande">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
            {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Bouton d'envoi du message"
          >
            {isPending ? "Envoi en cours..." : "Envoyer le message"}
          </Button>

          {/* Message de retour */}
          {state.message && (
            <div
              aria-label="Message de confirmation ou d'erreur"
              className={ state.message.includes("succès") ? "mt-[16px] p-12 rounded-md text-center bg-[#d1fad6] text-[#14532d]" : "mt-[16px] p-12 rounded-md text-center bg-[#fcd5d8] text-[#9b2c2c]" }
            >
              {state.message}
            </div>
          )}
        </form>
      </div>
    </div>

  );
}
