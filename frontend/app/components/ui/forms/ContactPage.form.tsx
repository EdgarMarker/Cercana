"use client";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getMessages } from "@/messages/getMessages";
interface Props {
  locale: string;
  textBtn: string;
}
const contactSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido").max(50),
  apellido: z.string().min(1, "Apellido es requerido").max(50),
  correo: z.string().email("Email inválido").max(100),
  telefono: z.string().min(1, "Teléfono es requerido").max(20),
  ciudad: z.string().min(1, "Ciudad es requerida").max(50),
  asunto: z.string().max(100).optional(),
  mensaje: z.string().max(500).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPageForm = ({ textBtn, locale }: Props) => {
  const L = getMessages(locale);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Datos validados y seguros:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form fadeInOut">
      <div className="form-row">
        <div className="form-group">
          <label>{L.form.name}*</label>
          <input type="text" {...register("nombre")} />
          {errors.nombre && (
            <span className="error">{errors.nombre.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>{L.form.lastName}*</label>
          <input type="text" {...register("apellido")} />
          {errors.apellido && (
            <span className="error">{errors.apellido.message}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{L.form.email}*</label>
          <input type="email" {...register("correo")} />
          {errors.correo && (
            <span className="error">{errors.correo.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>{L.form.phone}*</label>
          <input type="tel" {...register("telefono")} />
          {errors.telefono && (
            <span className="error">{errors.telefono.message}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{L.form.city}*</label>
          <input type="text" {...register("ciudad")} />
          {errors.ciudad && (
            <span className="error">{errors.ciudad.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>{L.form.subject}</label>
          <input type="text" {...register("asunto")} />
        </div>
      </div>

      <div className="form-group">
        <label>{L.form.message}</label>
        <textarea {...register("mensaje")} rows={4} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn__primary">
        {isSubmitting ? "Enviando..." : textBtn}
      </button>

    </form>
  );
};

export default ContactPageForm;
