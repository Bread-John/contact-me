# contact-me
An Azure server-less function written in JavaScript (Node) for handling contact forms on your personal website

***

#### The function will do:
1. Accept POST requests with user input from the front-end form
2. Validate the user input against few predefined rules (will be covered in details below)
3. Sanitise the user input so it does not contain any special character that may lead to injections
4. Interact with Microsoft Graph REST API to forward the sender contact info and message to you as an email
5. Send a response back to the front-end indicating the result of this process (success or fail)

***

#### The function will accept:
<table>
  <tr>
    <th>HTML Input name</th>
    <th>HTML Input type</th>
    <th>Input criteria</th>
    <th>Max input length</th>
    <th>Mandatory field</th>
  </tr>
  <tr>
    <td>name</td>
    <td>text</td>
    <td>Any alphabetic character, and whitespace</td>
    <td>40 characters</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>email</td>
    <td>email</td>
    <td>Any valid email address</td>
    <td><i>Not applicable</i></td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>subject</td>
    <td>text</td>
    <td>No restrictions</td>
    <td>50 characters</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>msg</td>
    <td>textarea</td>
    <td>No restrictions</td>
    <td>800 characters</td>
    <td>Yes</td>
  </tr>
</table>

***

#### The function will need:
+ An Azure account with active subscription (to deploy this function)
+ An active work or school Microsoft account with global admin access to Azure Active Directory (to set up Graph API access key)
+ Register this function as a new application and acquire the client secret within AAD
+ Provide your Client ID, the acquired Client secret, the Tenant ID of your organisation, to your function app as environment variables via Azure Portal
+ Provide the sender (this function) and recipient (yourself) email addresses, also as environment variables, note the sender email has to be within your organisation, but the recipient email can be any service (personal Outlook, Gmail, Yahoo etc.)
+ These environment variables should be named as:
    CLIENT_ID, CLIENT_SECRET, TENANT_ID, SENDER_EMAIL_ADDR, RECIPIENT_EMAIL_ADDR
  respectively
