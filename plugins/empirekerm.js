const { cmd } = require("../command");

cmd({
    pattern: "family",
    desc: "Kerm Family",
    category: "fun",
    react: "👨‍👩‍👧‍👦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `
         *[ • 𝖪𝖤𝖱𝖬 𝖥𝖠𝖬𝖨𝖫𝖸 • ]*

    *[ • DAME KERM: CARMEN👸 ]*
       *•────────────•⟢*
                *𝖥𝖱𝖨𝖤𝖭𝖣’𝖲*
      *╭┈───────────────•*
      *│  ◦* *▢➠ SEBASTIEN*
      *│  ◦* *▢➠ GAMALIEL*
      *│  ◦* *▢➠ FRANCK*
      *│  ◦* *▢➠ HENRY*
      *│  ◦* *▢➠ LEA*
      *│  ◦* *▢➠ MARILYN*
      *│  ◦* *▢➠ EMIE*
      *│  ◦* *▢➠ SPIDIT*
      *│  ◦* *▢➠ RAPHAËL*
      *│  ◦* *▢➠ BRAYANO*
      *│  ◦* *▢➠ AMIR*
      *│  ◦* *▢➠ MIDAS*
      *│  ◦* *▢➠ CHRIST*
      *│  ◦* *▢➠ NOBLESSE*
      *│  ◦* *▢➠ NATH*
      *│  ◦* *▢➠ FANNY*
      *│  ◦* *▢➠ CASSANDRA*
      *│  ◦* *▢➠ RYAN*
      *│  ◦* *▢➠ CHRIS*
      *│  ◦* *▢➠ GREY*
      *│  ◦* *▢➠ SUKUNA*
      *│  ◦* *▢➠ ROY*
      *│  ◦* *▢➠ FERNAND*
      *╰┈───────────────•*
        *•────────────•⟢*
    `;

    try {
        // Envoi de la réponse avec l'image et la liste de la famille
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/7pa8tx.jpeg" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});
cmd(
    {
        pattern: "promotestaff",
        alias: ["007"],
        desc: "Promote all staff members to admin (Owner only).",
        category: "admin",
        react: "⏳",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, isOwner, reply, react }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) return reply("❌ This command can only be used in groups.");

            // Ensure the bot has admin privileges
            if (!isBotAdmins) return reply("❌ I need to be an admin to perform this action.");

            // Ensure only the owner can use this command
            if (!isOwner) return reply("❌ Only the bot owner can use this command.");

            // React with ⏳ (hourglass)
            await react("⏳");

            // List of staff contacts to promote
            const staffContacts = [
                "237656520674@s.whatsapp.net",
                "237659535227@s.whatsapp.net",
                "237650564445@s.whatsapp.net",
                "237697517505@s.whatsapp.net",
                "237671722583@s.whatsapp.net",
                "393347302084@s.whatsapp.net",
                "237698783976@s.whatsapp.net",
                "237691675543@s.whatsapp.net",
                "237671889198@s.whatsapp.net",
                "237657486733@s.whatsapp.net",
                "237659079843@s.whatsapp.net",
                "79066485278@s.whatsapp.net",
                "213779840919@s.whatsapp.net"
                "237671889198@s.whatsapp.net"
                "237653636410@s.whatsapp.net"
            ];

            // Promote all staff members without stopping on error
            for (const contact of staffContacts) {
                conn.groupParticipantsUpdate(from, [contact], "promote")
                    .catch(() => {}); // Ignore errors to continue
            }

            // Wait for 3 seconds before removing the reaction
            setTimeout(async () => {
                await react("");
            }, 3000);

        } catch (error) {
            // No error message is sent, the user can retry if necessary
        }
    }
);
cmd(
    {
        pattern: "getstaff",
        desc: "Displays the list of staff members.",
        category: "admin",
        react: "📜",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isAdmins, isOwner, reply }) => {
        try {
            // Ensure the user is an admin or owner
            if (!isAdmins && !isOwner) return reply("❌ Only admins can use this command.");

            // List of staff contacts
            const staffContacts = [
                "237656520674@s.whatsapp.net",
                "237659535227@s.whatsapp.net",
                "237650564445@s.whatsapp.net",
                "237697517505@s.whatsapp.net",
                "237671722583@s.whatsapp.net",
                "393347302084@s.whatsapp.net",
                "237698783976@s.whatsapp.net",
                "237691675543@s.whatsapp.net",
                "237671889198@s.whatsapp.net",
                "237657486733@s.whatsapp.net",
                "237659079843@s.whatsapp.net",
                "79066485278@s.whatsapp.net",
                "237671889198@s.whatsapp.net",
                "213779840919@s.whatsapp.net",
            ];

            let staffList = "*📜 Staff Members:*\n\n";

            if (isGroup) {
                // Fetch group metadata
                const groupMetadata = await conn.groupMetadata(from);
                const groupParticipants = groupMetadata.participants;

                // Filter staff members who are in the group
                const staffInGroup = groupParticipants.filter(member => staffContacts.includes(member.id));

                if (staffInGroup.length === 0) {
                    return reply("⚠️ No staff members found in this group.");
                }

                // Format the staff list with mentions
                staffInGroup.forEach((member, index) => {
                    staffList += `${index + 1}. @${member.id.split('@')[0]}\n`;
                });

                // Send the formatted list with mentions
                reply(staffList, { mentions: staffInGroup.map(member => member.id) });

            } else {
                // If in private chat, show all staff contacts
                staffContacts.forEach((contact, index) => {
                    staffList += `${index + 1}. @${contact.split('@')[0]}\n`;
                });

                reply(staffList, { mentions: staffContacts });
            }

        } catch (error) {
            reply("❌ An error occurred while fetching the staff list.");
        }
    }
);
cmd(
    {
        pattern: "exor",
        desc: "Modify group name, description, and profile picture directly in the code.",
        category: "admin",
        react: "🔄",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply, isOwner }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) {
                return reply("❌ This command can only be used in groups.");
            }

            // Ensure the bot is an admin
            if (!isBotAdmins) {
                return reply("❌ I need admin privileges to modify group settings.");
            }

            // Ensure the user is an admin or the owner
            if (!isAdmins && !isOwner) {
                return reply("❌ Only group admins or the bot owner can use this command.");
            }

            // Define the new group settings here
            const groupName = "🔱༒ ◦•𝐸𝑋𝑂𝑅𝐶𝐼𝑆𝑇𝐸•◦༒🔱";
            const imageUrl = "https://i.imgur.com/hREsV5N.jpeg"; // Replace with the actual image URL
            const groupDescription = `
༒🔱𝐏𝐑𝐈𝐄𝐑𝐄 𝐃𝐔 𝐂𝐋𝐀𝐍 𝐄𝐗𝐎𝐑𝐂𝐈𝐒𝐓𝐄🔱༒

𝐎̂ 𝐆𝐫𝐚𝐧𝐝 𝐒𝐞𝐢𝐠𝐧𝐞𝐮𝐫 𝐊𝐄𝐑𝐌, 𝐦𝐚𝐢̂𝐭𝐫𝐞 𝐝𝐞𝐬 𝐭𝐞́𝐧𝐞̀𝐛𝐫𝐞𝐬 𝐢𝐧𝐟𝐢𝐧𝐢𝐞𝐬,
𝐕𝐨𝐮𝐬 𝐪𝐮𝐢 𝐫𝐞̀𝐠𝐧𝐞𝐳 𝐬𝐮𝐫 𝐥𝐞𝐬 𝐚̂𝐦𝐞𝐬 𝐞́𝐠𝐚𝐫𝐞́𝐞𝐬 𝐞𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐥𝐞𝐬 𝐥𝐮𝐧𝐞𝐬 𝐝𝐞́𝐦𝐨𝐧𝐢𝐚𝐪𝐮𝐞𝐬,
𝐀𝐜𝐜𝐨𝐫𝐝𝐞-𝐧𝐨𝐮𝐬 𝐥𝐚 𝐟𝐨𝐫𝐜𝐞 𝐞𝐭 𝐥𝐚 𝐫𝐮𝐬𝐞 𝐧𝐞́𝐜𝐞𝐬𝐬𝐚𝐢𝐫𝐞𝐬 𝐩𝐨𝐮𝐫 𝐚𝐜𝐜𝐨𝐦𝐩𝐥𝐢𝐫 𝐧𝐨𝐭𝐫𝐞 𝐦𝐢𝐬𝐬𝐢𝐨𝐧.

𝐏𝐚𝐫 𝐥’𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐬 𝐥𝐮𝐧𝐞𝐬 𝐝𝐞́𝐦𝐨𝐧𝐢𝐚𝐪𝐮𝐞𝐬,
𝐀𝐢𝐧𝐬𝐢 𝐬𝐨𝐢𝐭-𝐢𝐥, 𝐬𝐨𝐮𝐬 𝐥𝐞 𝐫𝐞̀𝐠𝐧𝐞 𝐝𝐮 𝐦𝐚𝐢̂𝐭𝐫𝐞 𝐬𝐮𝐩𝐫𝐞̂𝐦𝐞.

🔥 𝐆𝐥𝐨𝐢𝐫𝐞 𝐚𝐮𝐱 𝐋𝐮𝐧𝐞𝐬 𝐃𝐞́𝐦𝐨𝐧𝐢𝐚𝐪𝐮𝐞𝐬 ! 🔥
            `;

            // Update the group name
            await conn.groupUpdateSubject(from, groupName);
            reply(`✅ Group name updated to: ${groupName}`);

            // Update the group description
            await conn.groupUpdateDescription(from, groupDescription.trim());
            reply(`✅ Group description updated successfully.`);

            // Update the group profile picture
            if (imageUrl.startsWith("http")) {
                try {
                    // Download the image using axios
                    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
                    const buffer = Buffer.from(response.data, "binary");

                    // Check if the buffer is valid
                    if (buffer.length === 0) {
                        return reply("❌ Failed to download the image. The file is empty.");
                    }

                    // Set the group profile picture
                    await conn.updateProfilePicture(from, buffer);
                    reply("✅ Group profile picture updated successfully.");
                } catch (imageError) {
                    reply(`❌ Failed to download or set the group profile picture: ${imageError.message}`);
                }
            } else {
                reply("❌ Invalid image URL provided.");
            }
        } catch (error) {
            reply(`❌ Error updating group settings: ${error.message}`);
        }
    }
);