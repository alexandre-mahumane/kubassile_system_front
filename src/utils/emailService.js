import emailjs from "@emailjs/browser";
export const sendEmail = async (
  name,
  phone,
  orderType,
  description,
  value,
  orderStatus,
  paymentStatus,
  paymentMethod,
  createdAt
) => {
  const now = new Date();

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(now);
  const formData = {
    clientName: name,
    phone: phone,
    orderType: orderType,
    description: description,
    value: value,
    orderStatus: orderStatus,
    paymentMethod: paymentMethod,
    paymentStatus: paymentStatus,
    createdAt: formatted,
  };

  try {
    console.log("form  ", formData);
    const response = await emailjs.send(
      "service_3cacebr",
      "template_tiwd72r",
      formData,
      "NzYyQHm-h0APzmltu"
    );

    if (response.status === 200) {
      console.log("E-mail enviado com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};
