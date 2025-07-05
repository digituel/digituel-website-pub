import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "us-east-1" }); // Replace with your AWS region

export const handler = async (event) => {
  console.log('EVENT: ', event)
    // Extract the properties from the event body
  const { senderEmail, senderName, message } = JSON.parse(event.body)
  const params = {
    Destination: {
      ToAddresses: ["recipient@digituel.com"],
    },
        // Interpolate the data in the strings to send
    Message: {
      Body: {
        Text: { 
            Charset: "UTF-8",
            Data: `You just got a message from ${senderName} - ${senderEmail}:
            ${message}` 
        },
      },
      Subject: { 
        Charset: "UTF-8",
        Data: `Message from ${senderName}` },
    },
    Source: "sender@digituel.com",
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