
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "us-east-1" }); // Replace with your AWS region


export const handler = async (event) => {
  const params = {
    Destination: {
      ToAddresses: ["recipient@digituel.com"], // Replace with the recipient's email address
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: "This is the email body.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Email subject",
      },
    },
    Source: "sender@digituel.com", // Replace with your verified sender email address
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent:", data.MessageId);
    return {
      statusCode: 200,
      body: JSON.stringify({ messageId: data.MessageId }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};