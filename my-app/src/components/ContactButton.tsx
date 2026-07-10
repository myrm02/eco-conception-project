import LinkButton from "../../LinkButton";

export default function ContactButton() {
  return (
    <LinkButton classname="inline-flex justify-center" pageRoute="/contact">
      <button className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
        Contactez-nous
      </button>
    </LinkButton>
  );
}