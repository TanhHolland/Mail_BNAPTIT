const path = {
  apiEmail: "http://localhost:8080/api/v1/email",
};
export interface IEmailData {
  name: string;
  email: string;
  title: string;
  content: string;
  receivers: string;
  attachment: any[] | undefined;
}
export function sendEmail(data: IEmailData) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("email", data.email);
  form.append("title", data.title);
  form.append("content", data.content);
  form.append("receivers", data.receivers);
  if (data.attachment && data.attachment.length > 0) {
    data.attachment.forEach((file: any) => {
      if (file.originFileObj) {
        form.append("attachment", file.originFileObj);
      }
    });
  }
  return fetch(path.apiEmail, {
    method: "POST",
    body: form,
  });
}
