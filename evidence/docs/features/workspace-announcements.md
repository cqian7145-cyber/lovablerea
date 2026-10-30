# Show an announcement banner to your workspace
<!-- source: https://docs.lovable.dev/features/workspace-announcements.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Show an announcement banner to your workspace

> Post one message, with links and a countdown timer, that every workspace member sees in Lovable.

An announcement banner is one message that every member of your workspace sees at the top of the dashboard and in the project editor. Use it for a hackathon countdown, a maintenance notice, a policy reminder, or a link to internal resources.

* **Available on:** Business and Enterprise plans
* **Access:** Workspace admins and owners set the banner. Every workspace member sees it.
* **Location:** [**Workspace settings → Announcements**](https://lovable.dev/settings/announcements)

The banner does not consume credits.

## Set up an announcement banner

You set up the banner in one form. On a desktop browser, the form shows a preview of the banner as members will see it.

**1. Enable the banner setting**

Go to [**Workspace settings → Announcements**](https://lovable.dev/settings/announcements) and enable **Show announcement banner**. The text, color, and dismissal controls appear. Members see nothing until you show the banner in the last step.

**2. Write the banner text**

Enter your message in **Banner text**. Use the toolbar to format it:

* **Bold**, **Italic**, and **Underline** format the selected text.
* **Insert link** turns the selected text into a link. Enter the **URL**, starting with `https://`. Add a **Display text** if the link should read differently from its address. Links open in a new tab.

**3. Add a countdown timer (optional)**

Click **Add timer** and choose a timer type:

* **Duration** counts down from a length of time you set in hours and minutes, up to 999 hours. Pick a preset from 90 minutes to 72 hours or enter your own. The countdown starts when you show the banner.
* **End date** counts down to a date and time you choose. The date and time must be in the future.

Enable or disable **Show seconds in timer**, then click **Apply**. The timer appears in your text with a clock icon. Click it to change or remove the timer. You can add one timer per banner.

**4. Choose the background color**

Pick a preset in **Background color**, or click **Custom** to enter any color. Lovable sets the text to white or black, whichever is readable on your color. If neither white nor black text is readable on a custom color, Lovable adjusts the color slightly and shows **Adjusted for readability**. Custom colors are available on desktop browsers. On a phone, you choose from the presets.

**5. Decide whether members can dismiss the banner**

Enable **Banner dismissal** to let members dismiss the banner. A member who dismisses it stops seeing it in that browser until you next save the banner. Leave the setting disabled to keep the banner visible until you hide the banner yourself.

**6. Show the banner**

Click **Show banner**, or **Start timer** when your banner has a timer. The **Show announcement banner** setting shows an **Active** badge. Members see the banner the next time they open the dashboard or a project. To revert unsaved edits instead, click **Discard**.

> [!TIP]
>
> Open the dashboard or a project. The banner appears at the top of the page.

## How the countdown timer runs

The timer shows the remaining time as hours and minutes, with seconds if you enabled them. A three-day countdown starts at `72:00:00`. The timer reaches zero at the same moment for every member, whatever their time zone.

When the timer reaches zero, it stays at `00:00` and the banner remains visible. A member who hovers over the ended timer sees how long ago it ended. Hide the banner yourself when you no longer need it.

## Change or hide the banner

To change the banner, edit the fields and click **Save changes**. Members see the new version the next time they open the dashboard or a project, including anyone who dismissed the earlier one. A running timer keeps its end time when you change the text, the color, the dismissal setting, or whether it shows seconds.

To change the timer, click it in **Banner text**, adjust it, and click **Update**. A new duration restarts the countdown when you click **Restart timer**. A new end date takes effect when you click **Update end date**.

To hide the banner, disable **Show announcement banner** and click **Hide banner**. Lovable keeps your text, color, timer, and dismissal setting, so you can show the same banner again later. A duration timer restarts when you show the banner again. An end-date timer keeps its date, and if that date has passed, you must choose a new one before you can show the banner.

## Limitations

Keep these in mind when you plan an announcement:

* One banner per workspace, with one timer.
* Banner text is one paragraph of up to 2,000 characters, with no line breaks, lists, or images.
* You cannot schedule the banner to appear or disappear. A timer that reaches zero does not hide it.
* Dismissals are not recorded, so you cannot see who dismissed the banner.
* The banner does not appear in the Lovable mobile app.

## FAQ

> **Who sees the announcement banner?**
>
> Every member of the workspace, including viewers, sees it on the dashboard and in the project editor. Only workspace admins and owners can create or change it.

> **Can I schedule a banner to appear or disappear at a certain time?**
>
> No. You show and hide the banner yourself. A countdown timer shows how much time is left until a moment you choose, but it does not hide the banner when it reaches zero.

> **Does the countdown adjust for members in other time zones?**
>
> Yes. You enter the end date and time in your own time zone, and the countdown reaches zero at that moment for everyone. For example, if you set it to 5:00 PM Stockholm time, a member in New York sees the same countdown reach zero at 11:00 AM their time.

> **Does editing the banner restart the timer?**
>
> No. When you change the text, the color, the dismissal setting, or whether it shows seconds, the timer keeps running toward the same end time. The timer restarts only when you set a new duration, or when you show a hidden banner that has a duration timer.

> **Why did a banner I dismissed come back?**
>
> A workspace admin or owner saved the banner again. Every save shows the banner to everyone, even when only the color changed. Dismiss it again.


## Related topics

- [Workspace admin settings](https://docs.lovable.dev/features/workspace-admin-settings.md)
- [Add payments to your app](https://docs.lovable.dev/features/payments.md)
- [Lovable changelog](https://docs.lovable.dev/changelog.md)
- [Publish your Lovable project](https://docs.lovable.dev/features/publish.md)
- [Chat with Lovable across your workspace](https://docs.lovable.dev/features/chats.md)
