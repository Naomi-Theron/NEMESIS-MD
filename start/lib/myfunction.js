const {
    extractMessageContent,
    jidNormalizedUser,
    proto,
    delay,
    getContentType,
    areJidsSameUser,
    generateWAMessage
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const axios = require("axios");
const moment = require("moment-timezone");
const { sizeFormatter } = require("human-readable");
const util = require("util");

// ============================================================
// UNIX TIMESTAMP
// ============================================================

const unixTimestampSeconds = (date = new Date()) =>
    Math.floor(date.getTime() / 1000);

exports.unixTimestampSeconds = unixTimestampSeconds;

// ============================================================
// MESSAGE TAG
// ============================================================

exports.generateMessageTag = (epoch) => {
    let tag = unixTimestampSeconds().toString();

    if (epoch) {
        tag += ".--" + epoch;
    }

    return tag;
};

// ============================================================
// PROCESS TIME
// ============================================================

exports.processTime = (timestamp, now) => {
    return moment
        .duration(now - moment(timestamp * 1000))
        .asSeconds();
};

// ============================================================
// RANDOM FILE NAME
// ============================================================

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};

// ============================================================
// GET BUFFER
// ============================================================

exports.getBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: "GET",
            url,
            headers: {
                DNT: "1",
                "Upgrade-Insecure-Request": "1",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            ...options,
            responseType: "arraybuffer"
        });

        return res.data;
    } catch (err) {
        console.error("getBuffer error:", err.message);
        return null;
    }
};

// ============================================================
// CHECK BANDWIDTH
// ============================================================

exports.checkBandwidth = async () => {
    let ind = 0;
    let out = 0;

    try {
        for (
            let i of await require("node-os-utils")
                .netstat.stats()
        ) {
            ind += parseInt(i.inputBytes) || 0;
            out += parseInt(i.outputBytes) || 0;
        }
    } catch (err) {
        console.error("Bandwidth error:", err.message);
    }

    return {
        download: exports.bytesToSize(ind),
        upload: exports.bytesToSize(out)
    };
};

// ============================================================
// FORMAT SIZE
// ============================================================

exports.formatSize = (bytes) => {
    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB"
    ];

    if (!bytes || bytes === 0) {
        return "0 Bytes";
    }

    const i = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return (
        (bytes / Math.pow(1024, i)).toFixed(2) +
        " " +
        (sizes[i] || "Bytes")
    );
};

// ============================================================
// FETCH JSON
// ============================================================

exports.fetchJson = async (url, options = {}) => {
    try {
        const res = await axios({
            method: "GET",
            url,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/95.0.4638.69 Safari/537.36"
            },
            ...options
        });

        return res.data;
    } catch (err) {
        console.error("fetchJson error:", err.message);
        return null;
    }
};

// ============================================================
// RUNTIME
// ============================================================

exports.runtime = function (seconds) {
    seconds = Number(seconds);

    const d = Math.floor(
        seconds / (3600 * 24)
    );

    const h = Math.floor(
        (seconds % (3600 * 24)) / 3600
    );

    const m = Math.floor(
        (seconds % 3600) / 60
    );

    const s = Math.floor(
        seconds % 60
    );

    const dDisplay =
        d > 0
            ? d + (d === 1 ? " day, " : " days, ")
            : "";

    const hDisplay =
        h > 0
            ? h + (h === 1 ? " hour, " : " hours, ")
            : "";

    const mDisplay =
        m > 0
            ? m + (m === 1 ? " minute, " : " minutes, ")
            : "";

    const sDisplay =
        s > 0
            ? s + (s === 1 ? " second" : " seconds")
            : "";

    return (
        dDisplay +
        hDisplay +
        mDisplay +
        sDisplay
    );
};

// ============================================================
// CLOCK STRING
// ============================================================

exports.clockString = (ms) => {
    const h = isNaN(ms)
        ? "--"
        : Math.floor(ms / 3600000);

    const m = isNaN(ms)
        ? "--"
        : Math.floor(ms / 60000) % 60;

    const s = isNaN(ms)
        ? "--"
        : Math.floor(ms / 1000) % 60;

    return [h, m, s]
        .map((v) =>
            v.toString().padStart(2, "0")
        )
        .join(":");
};

// ============================================================
// SLEEP
// ============================================================

exports.sleep = async (ms) => {
    return new Promise((resolve) =>
        setTimeout(resolve, ms)
    );
};

// ============================================================
// CHECK URL
// ============================================================

exports.isUrl = (url = "") => {
    return url.match(
        new RegExp(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
            "gi"
        )
    );
};

// ============================================================
// GET TIME
// ============================================================

exports.getTime = (format, date) => {
    if (date) {
        return moment(date)
            .locale("id")
            .format(format);
    }

    return moment
        .tz("Asia/Jakarta")
        .locale("id")
        .format(format);
};

// ============================================================
// FORMAT DATE
// ============================================================

exports.formatDate = (
    n,
    locale = "id"
) => {
    const d = new Date(n);

    return d.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
};

// ============================================================
// INDONESIAN DATE
// ============================================================

exports.tanggal = (numer) => {
    const myMonths = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const myDays = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum’at",
        "Sabtu"
    ];

    const tgl = new Date(numer);

    const day = tgl.getDate();
    const bulan = tgl.getMonth();
    const thisDay = myDays[tgl.getDay()];

    const yy = tgl.getFullYear();

    const year = yy < 1000
        ? yy + 1900
        : yy;

    return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
};

// ============================================================
// FORMAT MEDIA SIZE
// ============================================================

exports.formatp = sizeFormatter({
    std: "JEDEC",
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) =>
        `${literal} ${symbol}B`
});

// ============================================================
// JSON FORMAT
// ============================================================

exports.jsonformat = (string) => {
    return JSON.stringify(
        string,
        null,
        2
    );
};

// ============================================================
// UTIL FORMAT
// ============================================================

function format(...args) {
    return util.format(...args);
}

exports.format = format;

// ============================================================
// BYTES TO SIZE
// ============================================================

exports.bytesToSize = (
    bytes,
    decimals = 2
) => {
    if (!bytes || bytes === 0) {
        return "0 Bytes";
    }

    const k = 1024;

    const dm =
        decimals < 0
            ? 0
            : decimals;

    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
    ];

    const i = Math.floor(
        Math.log(bytes) /
        Math.log(k)
    );

    return (
        parseFloat(
            (
                bytes /
                Math.pow(k, i)
            ).toFixed(dm)
        ) +
        " " +
        (sizes[i] || "Bytes")
    );
};

// ============================================================
// GET MEDIA SIZE
// ============================================================

exports.getSizeMedia = (path) => {
    return new Promise(
        (resolve, reject) => {

            if (
                typeof path === "string" &&
                /http/i.test(path)
            ) {

                axios
                    .get(path)
                    .then((res) => {

                        const length =
                            parseInt(
                                res.headers[
                                    "content-length"
                                ]
                            );

                        if (
                            !isNaN(length)
                        ) {
                            resolve(
                                exports.bytesToSize(
                                    length,
                                    3
                                )
                            );
                        } else {
                            reject(
                                "Could not determine file size"
                            );
                        }
                    })
                    .catch(reject);

            } else if (
                Buffer.isBuffer(path)
            ) {

                const length =
                    Buffer.byteLength(path);

                const size =
                    exports.bytesToSize(
                        length,
                        3
                    );

                resolve(size);

            } else {

                reject(
                    "Invalid media path"
                );
            }
        }
    );
};

// ============================================================
// PARSE MENTION
// ============================================================

exports.parseMention = (
    text = ""
) => {
    return [
        ...text.matchAll(
            /@([0-9]{5,16}|0)/g
        )
    ].map(
        (v) =>
            v[1] +
            "@s.whatsapp.net"
    );
};

// ============================================================
// GET GROUP ADMINS
// ============================================================

exports.getGroupAdmins = (
    participants = []
) => {

    const admins = [];

    for (
        const i of participants
    ) {

        if (
            i?.admin === "superadmin" ||
            i?.admin === "admin"
        ) {
            admins.push(i.id);
        }
    }

    return admins;
};

// ============================================================
// SAFE MESSAGE TEXT
// ============================================================

function getMessageText(
    message,
    msg,
    mtype
) {

    if (!message) {
        return "";
    }

    msg = msg || {};

    if (
        message.conversation
    ) {
        return message.conversation;
    }

    if (
        msg.text
    ) {
        return msg.text;
    }

    if (
        msg.caption
    ) {
        return msg.caption;
    }

    if (
        mtype ===
        "listResponseMessage"
    ) {
        return (
            msg
                ?.singleSelectReply
                ?.selectedRowId ||
            ""
        );
    }

    if (
        mtype ===
        "buttonsResponseMessage"
    ) {
        return (
            msg?.selectedButtonId ||
            ""
        );
    }

    if (
        mtype ===
        "templateButtonReplyMessage"
    ) {
        return (
            msg?.selectedId ||
            ""
        );
    }

    return (
        msg?.contentText ||
        msg?.selectedDisplayText ||
        msg?.title ||
        ""
    );
}

// ============================================================
// smsg
// ============================================================

exports.smsg = (
    Ridzcoder,
    m,
    store
) => {

    // --------------------------------------------------------
    // BASIC CHECK
    // --------------------------------------------------------

    if (!m) {
        return m;
    }

    const M = proto.WebMessageInfo;

    // --------------------------------------------------------
    // MESSAGE KEY
    // --------------------------------------------------------

    if (m.key) {

        m.id =
            m.key.id || "";

        const remoteJid =
            m.key.remoteJid || "";

        m.from =
            remoteJid.startsWith(
                "status"
            )
                ? jidNormalizedUser(
                    m.key?.participant ||
                    m.participant ||
                    ""
                )
                : jidNormalizedUser(
                    remoteJid
                );

        m.isBaileys =
            !!m.id &&
            m.id.startsWith("BAE5") &&
            m.id.length === 16;

        m.chat =
            remoteJid;

        m.fromMe =
            !!m.key.fromMe;

        m.isGroup =
            remoteJid.endsWith(
                "@g.us"
            );

        m.sender =
            Ridzcoder?.decodeJid
                ? Ridzcoder.decodeJid(
                    (
                        m.fromMe &&
                        Ridzcoder?.user?.id
                    ) ||
                    m.participant ||
                    m.key?.participant ||
                    m.chat ||
                    ""
                )
                : (
                    m.participant ||
                    m.key?.participant ||
                    m.chat ||
                    ""
                );

        if (m.isGroup) {

            m.participant =
                Ridzcoder?.decodeJid
                    ? Ridzcoder.decodeJid(
                        m.key?.participant ||
                        ""
                    )
                    : (
                        m.key?.participant ||
                        ""
                    );
        }
    }

    // --------------------------------------------------------
    // MESSAGE CONTENT
    // --------------------------------------------------------

    if (m.message) {

        m.mtype =
            getContentType(
                m.message
            );

        // No message type
        if (!m.mtype) {

            m.msg = {};

        } else if (
            m.mtype ===
            "viewOnceMessage"
        ) {

            const viewOnce =
                m.message
                    ?.viewOnceMessage
                    ?.message;

            if (viewOnce) {

                const innerType =
                    getContentType(
                        viewOnce
                    );

                m.msg =
                    innerType
                        ? (
                            viewOnce[
                                innerType
                            ] || {}
                        )
                        : {};

            } else {

                m.msg = {};
            }

        } else if (
            m.mtype ===
            "viewOnceMessageV2"
        ) {

            const viewOnce =
                m.message
                    ?.viewOnceMessageV2
                    ?.message;

            if (viewOnce) {

                const innerType =
                    getContentType(
                        viewOnce
                    );

                m.msg =
                    innerType
                        ? (
                            viewOnce[
                                innerType
                            ] || {}
                        )
                        : {};

            } else {

                m.msg = {};
            }

        } else {

            m.msg =
                m.message[
                    m.mtype
                ] || {};
        }

        // ----------------------------------------------------
        // BODY
        // ----------------------------------------------------

        m.body =
            getMessageText(
                m.message,
                m.msg,
                m.mtype
            );

        // ----------------------------------------------------
        // CONTEXT INFO
        // ----------------------------------------------------

        const contextInfo =
            m.msg?.contextInfo ||
            {};

        // ----------------------------------------------------
        // MENTIONS
        // ----------------------------------------------------

        m.mentionedJid =
            contextInfo
                ?.mentionedJid ||
            [];

        // ----------------------------------------------------
        // QUOTED MESSAGE
        // ----------------------------------------------------

        let quoted =
            contextInfo
                ?.quotedMessage ||
            null;

        m.quoted =
            quoted;

        if (m.quoted) {

            let type =
                getContentType(
                    m.quoted
                );

            // ----------------------------------------------
            // QUOTED MESSAGE TYPE
            // ----------------------------------------------

            if (type) {

                m.quoted =
                    m.quoted[
                        type
                    ] || {};

            } else {

                m.quoted = {};
            }

            // ----------------------------------------------
            // PRODUCT MESSAGE
            // ----------------------------------------------

            if (
                type ===
                "productMessage"
            ) {

                const productType =
                    getContentType(
                        m.quoted
                    );

                if (
                    productType
                ) {

                    m.quoted =
                        m.quoted[
                            productType
                        ] || {};
                }
            }

            // ----------------------------------------------
            // STRING MESSAGE
            // ----------------------------------------------

            if (
                typeof m.quoted ===
                "string"
            ) {

                m.quoted = {
                    text: m.quoted
                };
            }

            m.quoted =
                m.quoted || {};

            // ----------------------------------------------
            // QUOTED KEY
            // ----------------------------------------------

            m.quoted.key = {

                remoteJid:
                    contextInfo
                        ?.remoteJid ||
                    m.from ||
                    m.chat ||
                    "",

                participant:
                    jidNormalizedUser(
                        contextInfo
                            ?.participant ||
                        ""
                    ),

                fromMe:
                    areJidsSameUser(
                        jidNormalizedUser(
                            contextInfo
                                ?.participant ||
                            ""
                        ),
                        jidNormalizedUser(
                            Ridzcoder
                                ?.user
                                ?.id ||
                            ""
                        )
                    ),

                id:
                    contextInfo
                        ?.stanzaId ||
                    ""
            };

            // ----------------------------------------------
            // QUOTED MESSAGE INFO
            // ----------------------------------------------

            m.quoted.mtype =
                type || "";

            m.quoted.from =
                /g\.us|status/.test(
                    contextInfo
                        ?.remoteJid ||
                    ""
                )
                    ? m.quoted.key
                        .participant
                    : m.quoted.key
                        .remoteJid;

            m.quoted.id =
                contextInfo
                    ?.stanzaId ||
                "";

            m.quoted.chat =
                contextInfo
                    ?.remoteJid ||
                m.chat ||
                "";

            m.quoted.isBaileys =
                !!(
                    m.quoted.id &&
                    m.quoted.id
                        .startsWith(
                            "BAE5"
                        ) &&
                    m.quoted.id.length ===
                        16
                );

            m.quoted.sender =
                Ridzcoder?.decodeJid
                    ? Ridzcoder.decodeJid(
                        contextInfo
                            ?.participant ||
                        ""
                    )
                    : (
                        contextInfo
                            ?.participant ||
                        ""
                    );

            m.quoted.fromMe =
                areJidsSameUser(
                    m.quoted.sender ||
                        "",
                    Ridzcoder
                        ?.user
                        ?.id ||
                        ""
                );

            // ----------------------------------------------
            // QUOTED TEXT
            // ----------------------------------------------

            m.quoted.text =
                m.quoted?.text ||
                m.quoted?.caption ||
                m.quoted?.conversation ||
                m.quoted?.contentText ||
                m.quoted?.selectedDisplayText ||
                m.quoted?.title ||
                "";

            m.quoted.mentionedJid =
                contextInfo
                    ?.mentionedJid ||
                [];

            // ----------------------------------------------
            // LOAD QUOTED MESSAGE
            // ----------------------------------------------

            m.getQuotedObj =
            m.getQuotedMessage =
                async () => {

                    if (
                        !m.quoted?.id ||
                        !store ||
                        typeof store.loadMessage !==
                            "function"
                    ) {
                        return false;
                    }

                    try {

                        const q =
                            await store.loadMessage(
                                m.chat,
                                m.quoted.id,
                                Ridzcoder
                            );

                        if (!q) {
                            return false;
                        }

                        return exports.smsg(
                            Ridzcoder,
                            q,
                            store
                        );

                    } catch (err) {

                        console.error(
                            "Quoted message error:",
                            err.message
                        );

                        return false;
                    }
                };

            // ----------------------------------------------
            // FAKE QUOTED OBJECT
            // ----------------------------------------------

            const vM =
                m.quoted.fakeObj =
                    M.fromObject({

                        key: {

                            remoteJid:
                                m.quoted
                                    .chat,

                            fromMe:
                                m.quoted
                                    .fromMe,

                            id:
                                m.quoted
                                    .id
                        },

                        message:
                            quoted,

                        ...(m.isGroup
                            ? {
                                participant:
                                    m.quoted
                                        .sender
                            }
                            : {})
                    });

            // ----------------------------------------------
            // DELETE QUOTED
            // ----------------------------------------------

            m.quoted.delete =
                () =>
                    Ridzcoder.sendMessage(
                        m.quoted.chat,
                        {
                            delete:
                                vM.key
                        }
                    );

            // ----------------------------------------------
            // FORWARD QUOTED
            // ----------------------------------------------

            m.quoted.copyNForward =
                (
                    jid,
                    forceForward = false,
                    options = {}
                ) =>
                    Ridzcoder.copyNForward(
                        jid,
                        vM,
                        forceForward,
                        options
                    );

            // ----------------------------------------------
            // DOWNLOAD QUOTED
            // ----------------------------------------------

            m.quoted.download =
                () =>
                    Ridzcoder.downloadMediaMessage(
                        m.quoted
                    );
        }
    } else {

        // No message content
        m.msg =
            m.msg || {};

        m.body =
            m.body || "";

        m.mentionedJid =
            m.mentionedJid || [];
    }

    // ========================================================
    // MEDIA DOWNLOAD
    // ========================================================

    if (m.msg?.url) {

        m.download =
            () =>
                Ridzcoder.downloadMediaMessage(
                    m.msg
                );
    }

    // ========================================================
    // FINAL TEXT
    // ========================================================

    m.text =
        m.msg?.text ||
        m.msg?.caption ||
        m.message?.conversation ||
        m.msg?.contentText ||
        m.msg?.selectedDisplayText ||
        m.msg?.title ||
        m.body ||
        "";

    // ========================================================
    // REPLY
    // ========================================================

    m.reply = (
        text,
        chatId = m.chat,
        options = {}
    ) => {

        if (
            Buffer.isBuffer(text)
        ) {

            return Ridzcoder.sendMedia(
                chatId,
                text,
                "file",
                "",
                m,
                {
                    ...options
                }
            );

        }

        return Ridzcoder.sendText(
            chatId,
            text,
            m,
            {
                ...options
            }
        );
    };

    // ========================================================
    // COPY MESSAGE
    // ========================================================

    m.copy = () => {

        try {

            return exports.smsg(
                Ridzcoder,
                M.fromObject(
                    M.toObject(m)
                ),
                store
            );

        } catch (err) {

            console.error(
                "Copy message error:",
                err.message
            );

            return m;
        }
    };

    // ========================================================
    // COPY & FORWARD
    // ========================================================

    m.copyNForward = (
        jid = m.chat,
        forceForward = false,
        options = {}
    ) => {

        return Ridzcoder.copyNForward(
            jid,
            m,
            forceForward,
            options
        );
    };

    // ========================================================
    // RETURN MESSAGE
    // ========================================================

    return m;
};

// ============================================================
// AUTO RELOAD
// ============================================================

const file = require.resolve(
    __filename
);

fs.watchFile(
    file,
    () => {

        fs.unwatchFile(file);

        console.log(
            `Updated ${__filename}`
        );

        delete require.cache[
            file
        ];

        require(file);
    }
);