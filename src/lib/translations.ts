import { Language } from "./types";
import { numberToWordsEnglish } from "./audio";

export const translations = {
  en: {
    brand: "PaySure",
    tagline: "Every Payment. Verified. Every Time.",
    demoBadge: "DEMO SIMULATION ACTIVE",
    offlineNotice: "OFFLINE MODE: Payments logged locally. Authoritative verification paused.",
    
    // Nav items
    nav: {
      dashboard: "Vendor Dashboard",
      monitor: "Live Soundbox Monitor",
      verify: "Payment Verification",
      transactions: "Transaction History",
      simulation: "Simulation Lab",
      fraud: "Fraud Detection",
      orders: "Order Management",
      analytics: "Sales Analytics",
      reports: "Reports & Exports",
      notifications: "Notifications",
      profile: "Vendor Profile",
      settings: "Settings",
      support: "Help & Support",
      logout: "Logout",
    },

    // Greeting
    greeting: "Good Morning, Ramesh!",
    greetingSub: "Here is your verified business overview for today.",

    // Statuses
    status: {
      successful: "PAYMENT RECEIVED",
      pending: "PAYMENT IS BEING VERIFIED",
      failed: "PAYMENT NOT RECEIVED",
      verified: "Authoritatively Verified",
      simulated: "Simulated Transaction",
      offline: "Offline Local Record",
    },

    // Stats
    stats: {
      verifiedRevenue: "Today's Verified Revenue",
      successCount: "Successful Transactions",
      pendingCount: "Pending Transactions",
      failedCount: "Failed Transactions",
      totalOrders: "Total Orders",
      avgTicket: "Avg. Transaction Value",
      targetGoal: "Daily Target Progress",
    },

    // Voice announcement texts
    voice: {
      success: (amount: number) => `Payment received: ${numberToWordsEnglish(amount)} rupees.`,
      pending: () => `Payment is still pending. Please wait for confirmation.`,
      failed: () => `Payment not received. Please check again.`,
      fakeAlert: () => `Alert! Unverified payment detected. Do not release food.`,
      offlineAlert: () => `Warning: Device is offline. Payment cannot be verified right now.`,
      testVoice: () => `PaySure English voice announcement system is active and ready.`,
    },

    // Common actions
    actions: {
      generatePayment: "Generate Payment",
      verifyTransaction: "Verify Transaction",
      viewHistory: "View History",
      generateReport: "Generate Report",
      openSimulation: "Open Simulation Lab",
      exportCsv: "Export CSV",
      printReceipt: "Print Receipt",
      searchPlaceholder: "Search by UTR, Payer name, Amount...",
      resetDemo: "Reset Demo Data",
      newOrder: "Create New Order",
      soundboxTest: "Test Voice Soundbox",
      filterAll: "All",
      filterSuccess: "Successful",
      filterPending: "Pending",
      filterFailed: "Failed",
    },

    // Verification Engine
    verification: {
      heading: "Real-Time Payment Verification Engine",
      subheading: "Instant multi-factor check against authoritative UPI banking nodes to prevent fake screenshot fraud.",
      enterUtr: "Enter 12-Digit UPI Reference (UTR)",
      verifyBtn: "Verify Status Now",
      scanQr: "Scan UPI QR Code",
      authoritativeSource: "Banking Switch Node (NPCI / Authorized PSP)",
      idempotencyCheck: "Idempotency & Replay Protection",
      screenshotWarning: "Never rely on customer phone screens. Check this vendor screen only.",
    },

    // Simulation Lab
    simulationLab: {
      title: "Interactive Simulation Lab",
      subtitle: "Simulate live edge cases, network lag, fake screenshots, and duplicate payments for live demonstration.",
      amountLabel: "Payment Amount",
      statusLabel: "Simulated Outcome",
      networkLabel: "Network Condition",
      generateBtn: "Trigger Live Payment Simulation",
      presetsLabel: "One-Click Demo Scenarios",
      logsTitle: "Verification Pipeline Console (Live Step-by-Step)",
    },

    // Orders
    ordersSection: {
      title: "Quick Stall Orders",
      subtitle: "Serve hot food fast and track which order is paid.",
      orderNumber: "Order #",
      items: "Items",
      total: "Total",
      status: "Status",
      action: "Action",
      markServed: "Mark as Served",
      linkPayment: "Link Payment",
    },

    // Fraud Detection
    fraudSection: {
      title: "Fraud & Tampering Defense",
      subtitle: "Automated heuristic monitoring to protect street vendors from APK spoofing and forged UPI receipts.",
      riskHigh: "High Risk",
      riskMedium: "Medium Risk",
      riskLow: "Low Risk",
      actionRecommended: "Recommended Vendor Action",
      noAlerts: "No active fraud alerts detected. System is safe.",
    },
  },

  hi: {
    brand: "पे-श्योर (PaySure)",
    tagline: "हर भुगतान। सत्यापित। हर बार।",
    demoBadge: "डेमो सिमुलेशन सक्रिय",
    offlineNotice: "ऑफ़लाइन मोड: भुगतान स्थानीय रूप से दर्ज किया गया। बैंक सत्यापन रुका हुआ है।",

    // Nav items
    nav: {
      dashboard: "विक्रेता डैशबोर्ड",
      monitor: "लाइव साउंडबॉक्स मॉनिटर",
      verify: "भुगतान सत्यापन केंद्र",
      transactions: "लेन-देन इतिहास",
      simulation: "सिमुलेशन लैब",
      fraud: "धोखाधड़ी पहचान केंद्र",
      orders: "ऑर्डर प्रबंधन",
      analytics: "बिक्री विश्लेषण",
      reports: "रिपोर्ट और डाउनलोड",
      notifications: "सूचनाएं",
      profile: "विक्रेता प्रोफ़ाइल",
      settings: "सेटिंग्स",
      support: "सहायता एवं समर्थन",
      logout: "लॉग आउट",
    },

    // Greeting
    greeting: "शुभ प्रभात, रमेश जी!",
    greetingSub: "यहाँ आज के आपके सत्यापित व्यापार का विवरण है।",

    // Statuses
    status: {
      successful: "भुगतान प्राप्त हुआ",
      pending: "भुगतान प्रक्रियाधीन है",
      failed: "भुगतान प्राप्त नहीं हुआ",
      verified: "बैंक द्वारा सत्यापित",
      simulated: "डेमो लेन-देन",
      offline: "ऑफ़लाइन रिकॉर्ड",
    },

    // Stats
    stats: {
      verifiedRevenue: "आज की सत्यापित कमाई",
      successCount: "सफल लेन-देन",
      pendingCount: "प्रक्रियाधीन लेन-देन",
      failedCount: "विफल लेन-देन",
      totalOrders: "कुल ऑर्डर",
      avgTicket: "औसत लेन-देन मूल्य",
      targetGoal: "दैनिक लक्ष्य प्रगति",
    },

    // Voice announcement texts
    voice: {
      success: (amount: number) => `पे-श्योर पर ${amount} रुपये का भुगतान प्राप्त हुआ।`,
      pending: () => `भुगतान अभी प्रक्रियाधीन है। कृपया पुष्टि की प्रतीक्षा करें।`,
      failed: () => `भुगतान प्राप्त नहीं हुआ। कृपया दोबारा जांचें।`,
      fakeAlert: () => `सावधान! असत्यापित भुगतान का प्रयास। खाना न दें।`,
      offlineAlert: () => `चेतावनी: इंटरनेट बंद है। अभी भुगतान सत्यापित नहीं हो सकता।`,
      testVoice: () => `पे-श्योर ध्वनि प्रणाली सक्रिय और तैयार है।`,
    },

    // Common actions
    actions: {
      generatePayment: "भुगतान बनाएं",
      verifyTransaction: "सत्यापित करें",
      viewHistory: "इतिहास देखें",
      generateReport: "रिपोर्ट निकालें",
      openSimulation: "सिमुलेशन लैब खोलें",
      exportCsv: "CSV डाउनलोड करें",
      printReceipt: "रसीद प्रिंट करें",
      searchPlaceholder: "UTR नंबर या ग्राहक के नाम से खोजें...",
      resetDemo: "डेमो रीसेट करें",
      newOrder: "नया ऑर्डर बनाएं",
      soundboxTest: "आवाज टेस्ट करें",
      filterAll: "सभी",
      filterSuccess: "सफल",
      filterPending: "लंबित",
      filterFailed: "विफल",
    },

    // Verification Engine
    verification: {
      heading: "रीयल-टाइम भुगतान सत्यापन इंजन",
      subheading: "फर्जी स्क्रीनशॉट से बचने के लिए सीधे बैंक नोड से सत्यापन करें।",
      enterUtr: "12 अंकों का UPI रेफरेंस (UTR) दर्ज करें",
      verifyBtn: "सत्यापन जांचें",
      scanQr: "UPI क्यूआर स्कैन करें",
      authoritativeSource: "आधिकारिक बैंक नेटवर्क (NPCI)",
      idempotencyCheck: "पुनरावृत्ति और डुप्लिकेट सुरक्षा",
      screenshotWarning: "ग्राहक के मोबाइल स्क्रीन पर भरोसा न करें। केवल इस स्क्रीन पर देखें।",
    },

    // Simulation Lab
    simulationLab: {
      title: "इंटरएक्टिव सिमुलेशन लैब",
      subtitle: "कॉलेज डेमो के लिए असली परिदृश्य, नेटवर्क रुकावट और फर्जी स्क्रीनशॉट का परीक्षण करें।",
      amountLabel: "भुगतान राशि",
      statusLabel: "परिणाम स्थिति",
      networkLabel: "नेटवर्क स्थिति",
      generateBtn: "लाइव भुगतान सिमुलेशन शुरू करें",
      presetsLabel: "एक-क्लिक डेमो परिदृश्य",
      logsTitle: "सत्यापन पाइपलाइन कंसोल (लाइव प्रगति)",
    },

    // Orders
    ordersSection: {
      title: "त्वरित स्टॉल ऑर्डर",
      subtitle: "जल्दी नाश्ता परोसें और देखें किसका भुगतान पूरा हुआ।",
      orderNumber: "ऑर्डर #",
      items: "सामग्री",
      total: "कुल राशि",
      status: "स्थिति",
      action: "कार्रवाई",
      markServed: "परोसा गया",
      linkPayment: "भुगतान जोड़ें",
    },

    // Fraud Detection
    fraudSection: {
      title: "धोखाधड़ी रोकथाम केंद्र",
      subtitle: "फर्जी यूपीआई ऐप्स और एडिट किए गए स्क्रीनशॉट से वेंडरों की सुरक्षा।",
      riskHigh: "उच्च जोखिम",
      riskMedium: "मध्यम जोखिम",
      riskLow: "कम जोखिम",
      actionRecommended: "सुझाई गई कार्रवाई",
      noAlerts: "कोई धोखाधड़ी चेतावनी नहीं है। सब सुरक्षित है।",
    },
  },

  kn: {
    brand: "ಪೇಶ್ಯೂರ್ (PaySure)",
    tagline: "ಪ್ರತಿ ಪಾವತಿ. ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಪ್ರತಿ ಬಾರಿ.",
    demoBadge: "ಡೆಮೊ ಸಿಮ್ಯುಲೇಶನ್ ಸಕ್ರಿಯ",
    offlineNotice: "ಆಫ್‌ಲೈನ್ ಮೋಡ್: ಪಾವತಿಯನ್ನು ಸ್ಥಳೀಯವಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ. ಬ್ಯಾಂಕ್ ಪರಿಶೀಲನೆ ಬಾಕಿಯಿದೆ.",

    // Nav items
    nav: {
      dashboard: "ಮಾರಾಟಗಾರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      monitor: "ಲೈವ್ ಸೌಂಡ್‌ಬಾಕ್ಸ್ ಮಾನಿಟರ್",
      verify: "ಪಾವತಿ ಪರಿಶೀಲನೆ ಕೇಂದ್ರ",
      transactions: "ವಹಿವಾಟಿನ ಇತಿಹಾಸ",
      simulation: "ಸಿಮ್ಯುಲೇಶನ್ ಲ್ಯಾಬ್",
      fraud: "ವಂಚನೆ ಪತ್ತೆ ಕೇಂದ್ರ",
      orders: "ಆರ್ಡರ್ ನಿರ್ವಹಣೆ",
      analytics: "ಮಾರಾಟ ವಿಶ್ಲೇಷಣೆ",
      reports: "ವರದಿಗಳು",
      notifications: "ಸೂಚನೆಗಳು",
      profile: "ಪ್ರೊಫೈಲ್",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      support: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
      logout: "ಲಾಗ್ ಔಟ್",
    },

    // Greeting
    greeting: "ಶುಭೋದಯ, ರಮೇಶ್ ಅವರೇ!",
    greetingSub: "ಇಂದಿನ ನಿಮ್ಮ ಪರಿಶೀಲಿಸಿದ ವ್ಯವಹಾರದ ಸಾರಾಂಶ ಇಲ್ಲಿದೆ.",

    // Statuses
    status: {
      successful: "ಪಾವತಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
      pending: "ಪಾವತಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ",
      failed: "ಪಾವತಿ ವಿಫಲವಾಗಿದೆ",
      verified: "ಬ್ಯಾಂಕ್‌ನಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      simulated: "ಡೆಮೊ ವಹಿವಾಟು",
      offline: "ಆಫ್‌ಲೈನ್ ದಾಖಲೆ",
    },

    // Stats
    stats: {
      verifiedRevenue: "ಇಂದಿನ ಪರಿಶೀಲಿಸಿದ ಆದಾಯ",
      successCount: "ಯಶಸ್ವಿ ವಹಿವಾಟುಗಳು",
      pendingCount: "ಬಾಕಿ ವಹಿವಾಟುಗಳು",
      failedCount: "ವಿಫಲ ವಹಿವಾಟುಗಳು",
      totalOrders: "ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು",
      avgTicket: "ಸರಾಸರಿ ವಹಿವಾಟು ಮೌಲ್ಯ",
      targetGoal: "ದೈನಂದಿನ ಗುರಿ ಪ್ರಗತಿ",
    },

    // Voice announcement texts
    voice: {
      success: (amount: number) => `ಪೇಶ್ಯೂರ್‌ನಲ್ಲಿ ${amount} ರೂಪಾಯಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.`,
      pending: () => `ಪಾವತಿ ಇನ್ನೂ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ. ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.`,
      failed: () => `ಪಾವತಿ ಸ್ವೀಕರಿಸಲಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ.`,
      fakeAlert: () => `ಎಚ್ಚರಿಕೆ! ನಕಲಿ ಪಾವತಿ ಯತ್ನ. ಆಹಾರ ನೀಡಬೇಡಿ.`,
      offlineAlert: () => `ಎಚ್ಚರಿಕೆ: ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲ. ಪರಿಶೀಲನೆ ಸಾಧ್ಯವಿಲ್ಲ.`,
      testVoice: () => `ಪೇಶ್ಯೂರ್ ಧ್ವನಿ ಸೌಂಡ್‌ಬಾಕ್ಸ್ ಸಕ್ರಿಯವಾಗಿದೆ.`,
    },

    // Common actions
    actions: {
      generatePayment: "ಪಾವತಿ ರಚಿಸಿ",
      verifyTransaction: "ಪರಿಶೀಲಿಸಿ",
      viewHistory: "ಇತಿಹಾಸ ವೀಕ್ಷಿಸಿ",
      generateReport: "ವರದಿ ಪಡೆಯಿರಿ",
      openSimulation: "ಸಿಮ್ಯುಲೇಶನ್ ಲ್ಯಾಬ್ ತೆರೆಯಿರಿ",
      exportCsv: "CSV ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      printReceipt: "ರಶೀದಿ ಪ್ರಿಂಟ್ ಮಾಡಿ",
      searchPlaceholder: "ಯುಟಿಆರ್ ಅಥವಾ ಗ್ರಾಹಕರ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...",
      resetDemo: "ಡೆಮೊ ಮರುಹೊಂದಿಸಿ",
      newOrder: "ಹೊಸ ಆರ್ಡರ್ ರಚಿಸಿ",
      soundboxTest: "ಧ್ವನಿ ಪರೀಕ್ಷಿಸಿ",
      filterAll: "ಎಲ್ಲವೂ",
      filterSuccess: "ಯಶಸ್ವಿ",
      filterPending: "ಬಾಕಿ",
      filterFailed: "ವಿಫಲ",
    },

    // Verification Engine
    verification: {
      heading: "ನೈಜ-ಸಮಯದ ಪಾವತಿ ಪರಿಶೀಲನಾ ಎಂಜಿನ್",
      subheading: "ನಕಲಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ತಪ್ಪಿಸಲು ನೇರವಾಗಿ ಅಧಿಕೃತ ಬ್ಯಾಂಕಿಂಗ್ ನೋಡ್‌ನಿಂದ ಪರಿಶೀಲಿಸಿ.",
      enterUtr: "12 ಅಂಕಿಯ ಯುಪಿಐ ಸಂಖ್ಯೆ (UTR) ನಮೂದಿಸಿ",
      verifyBtn: "ಪರಿಶೀಲಿಸಿ",
      scanQr: "UPI QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      authoritativeSource: "ಅಧಿಕೃತ ಬ್ಯಾಂಕಿಂಗ್ ನೆಟ್‌ವರ್ಕ್ (NPCI)",
      idempotencyCheck: "ಪುನರಾವರ್ತನೆ ತಡೆಗಟ್ಟುವಿಕೆ",
      screenshotWarning: "ಗ್ರಾಹಕರ ಫೋನ್ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ನಂಬಬೇಡಿ. ಈ ಪರದೆಯ ಮೇಲೆ ಮಾತ್ರ ನೋಡಿ.",
    },

    // Simulation Lab
    simulationLab: {
      title: "ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಸಿಮ್ಯುಲೇಶನ್ ಲ್ಯಾಬ್",
      subtitle: "ಕಾಲೇಜು ಡೆಮೊಗಾಗಿ ವಿವಿಧ ಸನ್ನಿವೇಶಗಳು ಮತ್ತು ನಕಲಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಪರೀಕ್ಷೆ ನಡೆಸಿ.",
      amountLabel: "ಪಾವತಿ ಮೊತ್ತ",
      statusLabel: "ನಿರೀಕ್ಷಿತ ಸ್ಥಿತಿ",
      networkLabel: "ನೆಟ್‌ವರ್ಕ್ ಪರಿಸ್ಥಿತಿ",
      generateBtn: "ಲೈವ್ ಸಿಮ್ಯುಲೇಶನ್ ಪ್ರಾರಂಭಿಸಿ",
      presetsLabel: "ಒಂದು ಕ್ಲಿಕ್ ಡೆಮೊ ಸನ್ನಿವೇಶಗಳು",
      logsTitle: "ಪರಿಶೀಲನೆ ಕನ್ಸೋಲ್ (ಹಂತ ಹಂತದ ಪ್ರಕ್ರಿಯೆ)",
    },

    // Orders
    ordersSection: {
      title: "ತ್ವರಿತ ಆರ್ಡರ್‌ಗಳು",
      subtitle: "ಗ್ರಾಹಕರಿಗೆ ತಕ್ಷಣ ಸೇವೆ ನೀಡಿ ಮತ್ತು ಪಾವತಿ ಸ್ಥಿತಿ ಗಮನಿಸಿ.",
      orderNumber: "ಆರ್ಡರ್ #",
      items: "ಐಟಂಗಳು",
      total: "ಒಟ್ಟು",
      status: "ಸ್ಥಿತಿ",
      action: "ಕ್ರಮ",
      markServed: "ವಿತರಿಸಲಾಗಿದೆ",
      linkPayment: "ಪಾವತಿ ಲಿಂಕ್ ಮಾಡಿ",
    },

    // Fraud Detection
    fraudSection: {
      title: "ವಂಚನೆ ಪತ್ತೆ ಮತ್ತು ರಕ್ಷಣೆ",
      subtitle: "ನಕಲಿ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು ಮತ್ತು ತಿದ್ದಲಾದ ರಶೀದಿಗಳಿಂದ ಬೀದಿಬದಿ ವ್ಯಾಪಾರಿಗಳ ರಕ್ಷಣೆ.",
      riskHigh: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
      riskMedium: "ಮಧ್ಯಮ ಅಪಾಯ",
      riskLow: "ಕಡಿಮೆ ಅಪಾಯ",
      actionRecommended: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
      noAlerts: "ಯಾವುದೇ ವಂಚನೆ ಪತ್ತೆಯಾಗಿಲ್ಲ. ವ್ಯವಸ್ಥೆ ಸುರಕ್ಷಿತವಾಗಿದೆ.",
    },
  },
};
