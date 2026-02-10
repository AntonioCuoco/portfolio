import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRef } from "react";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    onSubmitData(data);
  }
  console.log(errors);

  const formRef = useRef(null);

  const onSubmitData = async (dataValues) => {
    try {
      const formData = new FormData(formRef.current);

      formData.append("access_key", import.meta.env.VITE_NEXT_PUBLIC_KEY);

      const response = await axios.post("https://api.web3forms.com/submit", formData);

      if (response.data.success) {
        Swal.fire({
          title: "Form inviato con successo",
          text: "Ti risponderò il prima possibile",
          icon: "success",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Errore nell'invio del form",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-8 w-full"
    >
      <div className="group relative">
        <input
          type="text"
          placeholder=" "
          {...register("user_name", { required: true })}
          className="peer w-full bg-transparent border-b border-black/20 py-3 text-xl outline-none transition-colors focus:border-indigo-500"
        />
        <label className="absolute left-0 top-3 text-slate-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">
          Your Name
        </label>
      </div>

      <div className="group relative">
        <input
          type="email"
          placeholder=" "
          {...register("user_email", { required: true })}
          className="peer w-full bg-transparent border-b border-black/20 py-3 text-xl outline-none transition-colors focus:border-indigo-500"
        />
        <label className="absolute left-0 top-3 text-slate-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">
          Your Email
        </label>
      </div>

      <div className="group relative">
        <textarea
          rows={4}
          placeholder=" "
          {...register("message", { required: true })}
          className="peer w-full bg-transparent border-b border-black/20 py-3 text-lg outline-none transition-colors focus:border-indigo-500 resize-none"
        />
        <label className="absolute left-0 top-3 text-slate-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">
          Tell me about your project
        </label>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-10 py-4 bg-black text-white rounded-full font-tanker text-lg hover:bg-[#EE7B30] hover:text-black transition-all duration-300 transform hover:scale-105"
        >
          SEND MESSAGE
        </button>
      </div>
    </form>
  );
}
