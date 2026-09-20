# Kidture beta testing: v1 operator runbook

The public entry point is `https://kidture.health/beta-testing`.

## One-time setup

1. In Vercel, set `PUBLIC_TESTFLIGHT_BETA_URL` to the current public TestFlight invitation URL.
2. Create a private Google Sheet named **Kidture Android beta requests**. Rename its first tab to **Android beta requests**, then add this first row:

   ```text
   Submitted at | Google Play account email | Status | Added to Play Console at | Invitation emailed at | Notes
   ```

3. Attach this Google Apps Script to that spreadsheet and deploy it as a Web app that runs as the spreadsheet owner. Copy its deployment URL to `BETA_REQUEST_WEBHOOK_URL` in Vercel.

   ```javascript
   const BETA_SHEET_NAME = 'Android beta requests'

   function doPost(event) {
     const payload = JSON.parse(event.postData.contents)
     if (payload.type !== 'android_beta_request' || !payload.email) {
       return ContentService.createTextOutput(JSON.stringify({ ok: false }))
         .setMimeType(ContentService.MimeType.JSON)
     }

     const sheet = SpreadsheetApp.getActive().getSheetByName(BETA_SHEET_NAME)
     sheet.appendRow([payload.submittedAt, payload.email, 'requested', '', '', ''])
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON)
   }
   ```

4. Do a request from the Android form and confirm the address arrives in the sheet with status `requested`.

## Android approval and invitation

1. Review the request in the private Sheet.
2. Change its status to `play_access_pending`.
3. Export every active Android tester from the Sheet as one complete, one-email-per-line CSV. Include everyone whose status is `play_access_pending`, `play_access_granted`, or `invited`; do not include `requested` or `removed`.
4. Upload that complete CSV to the selected Google Play Console Internal testing email list. Google Play replaces the list, so never upload only the newly approved address.
5. When the address is in Play Console, set the Sheet status to `play_access_granted` and add the timestamp.
6. Send the email below manually from Kidture. Then set status to `invited` and add the timestamp.

## Android invitation email

Subject: Your Kidture Android beta is ready

Hi,

You can now install the Kidture Android beta.

Open this link on your Android phone while signed in to the Google account you gave us: **[paste the stable Google Play Internal testing opt-in URL]**

Tap **Become a tester**, then **Download test app**. Google Play will install the test version normally—there is no developer account or special phone setup required.

If the link says you are not eligible, make sure the Play Store is signed in to this email address: **[recipient email]**.

Thanks for helping us improve Kidture.

## Boundaries of v1

- The site does not show or send the Android Play link.
- The site does not add testers to Play Console.
- The site does not send email automatically.
- Do not use Google Play Internal app sharing for this cohort.
