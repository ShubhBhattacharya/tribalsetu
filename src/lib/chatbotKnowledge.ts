// TribalSetu Universal Chatbot Knowledge Engine (TribalMitra AI)
import { ALL_INDIAN_LANGUAGES, type SupportedLanguage } from './languages';
export { ALL_INDIAN_LANGUAGES, type SupportedLanguage };

export interface ActionLink {
  label: string;
  href: string;
}

export interface BotKnowledgeEntry {
  id: string;
  category: string;
  keywords: string[];
  actionLinks: ActionLink[];
  answers: {
    [langCode: string]: {
      title: string;
      body: string[];
      tip?: string;
    };
  };
}

export const BOT_KNOWLEDGE_BASE: BotKnowledgeEntry[] = [
  {
    id: 'nfst_scheme',
    category: 'Schemes',
    keywords: [
      'nfst', 'national fellowship', 'phd', 'fellowship', 'm.phil', 'research', '38800', '44000', 'jrf', 'srf', 'ph.d',
      'डॉक्टरेट', 'रिसर्च', 'छात्रवृत्ति', 'एनएफएसटी', 'फेलोशिप', 'शोध', 'अनुसंधान', 'स्टाइपेंड'
    ],
    actionLinks: [
      { label: 'NFST आवेदन करें (Apply NFST)', href: '/student/apply' },
      { label: 'नियम व पात्रता (Eligibility)', href: '/admin/rules' }
    ],
    answers: {
      hi: {
        title: 'राष्ट्रीय जनजातीय फैलोशिप योजना (NFST)',
        body: [
          '**NFST (National Fellowship for ST Students)** जनजातीय कार्य मंत्रालय (MoTA) द्वारा अनुसूचित जनजाति के विद्यार्थियों को भारत के शीर्ष विश्वविद्यालयों में Ph.D. एवं M.Phil. शोध हेतु दी जाती है।',
          '• **वार्षिक स्लॉट (Slots)**: प्रतिवर्ष 750 विद्यार्थियों का चयन।',
          '• **स्टाइपेंड (Stipend Package)**:',
          '  - **JRF (प्रथम 2 वर्ष)**: ₹38,800 प्रति माह + आकस्मिकता अनुदान (₹12,000 - ₹25,000/वर्ष) + HRA।',
          '  - **SRF (शेष 3 वर्ष)**: ₹44,000 प्रति माह + आकस्मिकता अनुदान।',
          '• **पात्रता**: मान्यता प्राप्त विश्वविद्यालय में नियमित Ph.D./M.Phil में प्रवेश, स्नातकोत्तर में न्यूनतम 55% अंक, और परिवार की वार्षिक आय ₹8,00,000 से कम।'
        ],
        tip: 'AI ऑप्टिकल इंजन के माध्यम से आपके जाति एवं आय प्रमाण-पत्र 5 सेकंड में स्वतः सत्यापित हो जाते हैं।'
      },
      en: {
        title: 'National Fellowship for ST Students (NFST)',
        body: [
          '**NFST** is a premier initiative of the Ministry of Tribal Affairs (MoTA) providing comprehensive financial support to Scheduled Tribe students pursuing full-time Ph.D. and M.Phil. research across Indian universities.',
          '• **Annual Allocation**: 750 fellowship slots awarded every academic year.',
          '• **Financial Package**:',
          '  - **JRF (Years 1-2)**: ₹38,800/month + Contingency grant (₹12,000 to ₹25,000/yr) + City HRA.',
          '  - **SRF (Years 3-5)**: ₹44,000/month + Contingency grant.',
          '• **Key Eligibility**: Valid ST community certificate, Master\'s degree with at least 55% marks, and annual family income ceiling of ₹8,00,000.'
        ],
        tip: 'TribalSetu integrates instant optical OCR to cross-check certificates against DigiLocker standards.'
      },
      sat: {
        title: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱯᱷᱮᱞᱳᱥᱤᱯ ᱴᱨᱟᱭᱵᱟᱞ ᱟᱹᱪᱩᱨᱤᱭᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ (NFST)',
        body: [
          '**NFST** ᱫᱚ ᱵᱷᱟᱨᱚᱛ ᱥᱚᱨᱠᱟᱨ ᱨᱮᱱᱟᱜ ᱢᱚᱱᱛᱨᱟᱞᱚᱭ (MoTA) ᱦᱚᱛᱮᱛᱮ ᱮᱥ.ᱴᱤ (ST) ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ Ph.D. ᱯᱟᱲᱦᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚ ᱠᱟᱱᱟ᱾',
          '• ᱥᱮᱨᱢᱟ ᱨᱮ ᱗᱕᱐ ᱜᱚᱴᱟᱝ ᱥᱞᱚᱴ (750 Slots) ᱢᱮᱱᱟᱜ-ᱟ᱾',
          '• JRF: ₹38,800 ᱪᱟᱸᱫᱚ ᱨᱮ (First 2 Years), SRF: ₹44,000 ᱪᱟᱸᱫᱚ ᱨᱮ᱾',
          '• ᱜᱷᱟᱨᱚᱸᱡᱽ ᱨᱮᱭᱟᱜ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱟᱨᱡᱟᱣ ₹8,00,000 ᱠᱷᱚᱱ ᱠᱚᱢ ᱦᱩᱭᱩᱜ ᱞᱟᱹᱠᱛᱤ᱾'
        ]
      },
      bn: {
        title: 'জাতীয় উপজাতীয় ফেলোশিপ যোজনা (NFST)',
        body: [
          '**NFST** হলো উপজাতি বিষয়ক মন্ত্রক (MoTA) কর্তৃক তপশিলি উপজাতি (ST) শিক্ষার্থীদের জন্য ভারতের শীর্ষ বিশ্ববিদ্যালয়ে পিএইচডি (Ph.D.) করার আর্থিক সহায়তা।',
          '• **বার্ষিক আসন**: প্রতি বছর ৭৫০ জন শিক্ষার্থী।',
          '• **স্টাইপেন্ড**: JRF ₹৩৮,৮০০/মাস, SRF ₹৪৪,০০০/মাস + বাৎসরিক অনুদান।',
          '• **যোগ্যতা**: স্নাতকোত্তরে ন্যূনতম ৫৫% নম্বর এবং পারিবারিক বার্ষিক আয় ₹৮,০০,০০০ এর নিচে।'
        ]
      },
      te: {
        title: 'నేషనల్ ఫెలోషిప్ ఫర్ ఎస్టీ స్టూడెంట్స్ (NFST)',
        body: [
          '**NFST** ద్వారా షెడ్యూల్డ్ తెగల (ST) విద్యార్థులకు భారతీయ విశ్వవిద్యాలయాలలో Ph.D. పరిశోధన కోసం MoTA ద్వారా ఆర్థిక సహాయం అందించబడుతుంది.',
          '• **వార్షిక సీట్లు**: సంవత్సరానికి 750 స్లాట్లు.',
          '• **స్టైపెండ్**: JRF నెలకు ₹38,800, SRF నెలకు ₹44,000.',
          '• **అర్హత**: పీజీలో 55% మార్కులు, కుటుంబ వార్షిక ఆదాయం ₹8 లక్షల లోపు ఉండాలి.'
        ]
      },
      ta: {
        title: 'பழங்குடியினர் தேசிய உதவித்தொகை திட்டம் (NFST)',
        body: [
          '**NFST** என்பது பழங்குடியினர் விவகார அமைச்சகத்தால் (MoTA) ST மாணவர்களுக்கு இந்தியாவில் Ph.D. ஆராய்ச்சி செய்ய வழங்கப்படும் முழு நிதியுதவி.',
          '• **வருடாந்திர இடங்கள்**: ஆண்டுக்கு 750 இடங்கள்.',
          '• **உதவித்தொகை**: JRF மாதம் ₹38,800, SRF மாதம் ₹44,000.',
          '• **தகுதி**: முதுகலையில் 55% மதிப்பெண், குடும்ப ஆண்டு வருமானம் ₹8 லட்சத்திற்குள் இருக்க வேண்டும்.'
        ]
      },
      mr: {
        title: 'राष्ट्रीय आदिवासी फेलोशिप योजना (NFST)',
        body: [
          '**NFST** ही आदिवासी कार्य मंत्रालयाची (MoTA) अनुसूचित जमातीच्या (ST) विद्यार्थ्यांसाठी भारतात Ph.D. करण्यासाठीची प्रमुख योजना आहे.',
          '• **वार्षिक जागा**: दरवर्षी ७५० जागा.',
          '• **स्टायपेंड**: JRF दरमहा ₹३८,८००, SRF दरमहा ₹४४,००० + वार्षिक अनुदान.',
          '• **पात्रता**: पदव्युत्तर पदवीत ५५% गुण, कौटुंबिक वार्षिक उत्पन्न ₹८ लाखांपेक्षा कमी.'
        ]
      },
      gu: {
        title: 'રાષ્ટ્રીય જનજાતિ ફેલોશિપ યોજના (NFST)',
        body: [
          '**NFST** યોજના હેઠળ અનુસૂચિત જનજાતિ (ST) ના વિદ્યાર્થીઓને ભારતમાં Ph.D. કરવા માટે માસિક સ્ટાઈપેન્ડ મળે છે.',
          '• **વાર્ષિક સ્લોટ**: ૭૫૦ વિદ્યાર્થીઓ.',
          '• **સ્ટાઈપેન્ડ**: JRF દર મહિને ₹૩૮,૮૦૦, SRF ₹૪૪,૦૦૦.',
          '• **પાત્રતા**: અનુસ્નાતકમાં ૫૫% ગુણ અને કુટુંબની આવક ₹૮ લાખથી ઓછી.'
        ]
      }
    }
  },
  {
    id: 'nos_scheme',
    category: 'Schemes',
    keywords: [
      'nos', 'national overseas', 'abroad', 'foreign', 'overseas', 'qs ranking', 'विदेश', 'विदेश अध्ययन', 'विदेशी छात्रवृत्ति',
      'एनओएस', 'international', 'oxford', 'cambridge', 'harvard', 'mit', 'us', 'uk', 'बाहर पढ़ना'
    ],
    actionLinks: [
      { label: 'NOS आवेदन करें (Apply NOS)', href: '/student/apply' },
      { label: 'विद्यार्थी डैशबोर्ड (Dashboard)', href: '/student/dashboard' }
    ],
    answers: {
      hi: {
        title: 'राष्ट्रीय प्रवासी छात्रवृत्ति योजना (NOS for Overseas Studies)',
        body: [
          '**NOS (National Overseas Scholarship)** के तहत अनुसूचित जनजाति (ST) के मेधावी छात्रों को विश्व के शीर्ष 500 QS रैंकिंग वाले विदेशी विश्वविद्यालयों में मास्टर और Ph.D. करने के लिए संपूर्ण वित्तीय सहायता दी जाती है।',
          '• **वार्षिक स्लॉट (Slots)**: प्रतिवर्ष 100 मेधावी छात्र।',
          '• **संपूर्ण वित्तीय कवरेज (100% Financial Coverage)**:',
          '  - **100% ट्यूशन फीस**: विदेशी विश्वविद्यालय को सीधे भुगतान।',
          '  - **वार्षिक निर्वाह भत्ता (Living Allowance)**: $15,400 (USA/अन्य देश) अथवा £9,900 (UK)।',
          '  - **अन्य लाभ**: दोनों तरफ की हवाई यात्रा टिकट, वीजा शुल्क, एवं अंतरराष्ट्रीय स्वास्थ्य बीमा।',
          '• **पात्रता**: ST प्रमाण-पत्र, न्यूनतम 60% अंक, परिवार की वार्षिक आय ₹8 लाख से कम, तथा QS Top 500 संस्थान का ऑफर लेटर।'
        ],
        tip: 'ऑफर लेटर अपलोड करते समय बिना शर्त (Unconditional) प्रवेश पुष्टि की जांच अवश्य कर लें।'
      },
      en: {
        title: 'National Overseas Scholarship (NOS for Study Abroad)',
        body: [
          '**NOS** finances Scheduled Tribe (ST) scholars for pursuing Master\'s and Ph.D. degrees abroad in top 500 QS World Ranked universities.',
          '• **Annual Allocation**: 100 meritorious scholars selected every year.',
          '• **Full Financial Coverage**:',
          '  - **100% Tuition Fees** remitted directly to the foreign university.',
          '  - **Annual Living Allowance**: $15,400 (USA and other countries) or £9,900 (UK).',
          '  - **Travel & Logistics**: Economy return flights, visa processing fee, and international medical insurance.',
          '• **Eligibility**: ST Certificate, at least 60% marks in qualifying degree, annual family income <= ₹8 Lakhs, and admission offer from a top 500 QS institution.'
        ]
      },
      sat: {
        title: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱤᱫᱮᱥ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱴᱨᱟᱭᱵᱟᱞ ᱠᱚ ᱞᱟᱹᱜᱤᱫ (NOS)',
        body: [
          '**NOS** ᱫᱚ ᱮᱥ.ᱴᱤ (ST) ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱫᱤᱥᱚᱢ ᱵᱟᱦᱨᱮ (Top 500 QS University) ᱨᱮ Master\'s ᱟᱨ Ph.D. ᱯᱟᱲᱦᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱱᱟᱢ ᱠᱷᱚᱨᱚᱪ ᱮᱢᱚᱜ-ᱟ᱾',
          '• ᱥᱮᱨᱢᱟ ᱨᱮ ᱑᱐᱐ ᱜᱚᱴᱟᱝ ᱥᱞᱚᱴ (100 Slots)।',
          '• ᱑᱐᱐% ᱴᱤᱣᱥᱚᱱ ᱯᱷᱤ + ᱡᱚᱢ-ᱧᱩ ᱠᱷᱚᱨᱚᱪ ($15,400 / £9,900) + ᱩᱰᱟᱹᱱ ᱴᱤᱠᱤᱴ ᱥᱚᱨᱠᱟᱨ ᱮᱢᱚᱜ-ᱟ᱾',
          '• ᱜᱷᱟᱨᱚᱸᱡᱽ ᱨᱮᱭᱟᱜ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱟᱨᱡᱟᱣ ₹8,00,000 ᱠᱷᱚᱱ ᱠᱚᱢ ᱦᱩᱭᱩᱜ ᱞᱟᱹᱠᱛᱤ᱾'
        ]
      },
      bn: {
        title: 'জাতীয় ওভারসিজ স্কলারশিপ (NOS - বিদেশে উচ্চশিক্ষা)',
        body: [
          '**NOS** এর আওতায় শীর্ষ ৫০০ কিউএস (QS) র‍্যাঙ্কিংধারী বিদেশি বিশ্ববিদ্যালয়ে মাস্টার্স ও পিএইচডি করার সম্পূর্ণ খরচ উপজাতি বিষয়ক মন্ত্রক বহন করে।',
          '• **বার্ষিক আসন**: ১০০ জন।',
          '• **সুযোগ-সুবিধা**: ১০০% টিউশন ফি, বার্ষিক লিভিং অ্যালাউন্স ($15,400/£9,900), বিমানের টিকিট ও মেডিকেল ইন্স্যুরেন্স।',
          '• **যোগ্যতা**: যোগ্য ডিগ্রি তে ৬০% নম্বর এবং পারিবারিক আয় বার্ষিক ₹৮ লাখের কম।'
        ]
      }
    }
  },
  {
    id: 'deficiency_guide',
    category: 'Deficiency',
    keywords: [
      'deficiency', 'defect', 'issue', 'expired', 'reject', 're-upload', 'कमी', 'त्रुटि', 'दस्तावेज त्रुटि',
      'सत्यापन', 'सुधार', 'deficiencies', 'problem', 'आय प्रमाण पत्र पुराना', 'caste', 'income'
    ],
    actionLinks: [
      { label: 'कमी समाधान पोर्टल (Resolve Deficiency)', href: '/student/deficiencies' },
      { label: 'दस्तावेज वॉल्ट (Document Vault)', href: '/student/apply' }
    ],
    answers: {
      hi: {
        title: 'दस्तावेज़ कमी (Deficiency) का समाधान कैसे करें?',
        body: [
          'यदि आपके आवेदन में कोई दस्तावेज़ अस्पष्ट, पुराना अथवा AI/अधिकारी द्वारा जांच में त्रुटिपूर्ण पाया जाता है, तो उसे **Deficiency (कमी)** के रूप में मार्क किया जाता है।',
          '• **समय सीमा (Deadline)**: सूचना प्राप्त होने के 15 दिनों के भीतर सही दस्तावेज़ पुनः अपलोड करना अनिवार्य है।',
          '• **प्रमुख कारण**:',
          '  1. **आय प्रमाण-पत्र 12 महीने से अधिक पुराना होना** (चालू वित्तीय वर्ष 2026-27 का होना अनिवार्य)।',
          '  2. जाति प्रमाण-पत्र पर अधिकृत तहसीलदार/एसडीएम की सील या डिजिटल हस्ताक्षर का अभाव।',
          '  3. नाम अथवा आधार में स्पेलिंग विसंगति।',
          '• **समाधान कदम**: सीधे `/student/deficiencies` पर जाएं, कमी का विवरण पढ़ें, सही वैध PDF/JPG अपलोड करें। हमारा AI तुरंत रि-वेरीफाई कर स्टेटस को "VERIFIED" कर देगा।'
        ],
        tip: 'नया प्रमाण-पत्र अपलोड करते ही तुरंत लाइव OCR स्कोर 98%+ हो जाएगा।'
      },
      en: {
        title: 'How to Resolve Application Deficiency?',
        body: [
          'When MoTA\'s Optical AI or Desk Scrutiny Officer identifies an incomplete, expired, or illegible document, your application enters the **Deficiency State**.',
          '• **Resolution Window**: 15 calendar days from the date of notification.',
          '• **Common Triggers**:',
          '  1. **Income Certificate older than 12 months** (must be issued for current FY 2026-27).',
          '  2. Missing official revenue seal/digital signature on ST certificate.',
          '  3. Discrepancy between candidate name and identity records.',
          '• **How to Resolve**: Navigate to `/student/deficiencies`, read the officer note, upload the rectified document, and click "Submit Rectified Document". AI will immediately re-verify it.'
        ]
      }
    }
  },
  {
    id: 'merit_calculation',
    category: 'Merit',
    keywords: [
      'merit', 'score', 'formula', 'ranking', 'list', 'cutoff', 'मेरिट', 'रैंक', 'कटऑफ', 'स्कोर', 'गणना', 'सिलेक्शन', 'चयन सूची'
    ],
    actionLinks: [
      { label: 'लाइव मेरिट सूची देखें (View Merit Engine)', href: '/admin/merit' },
      { label: 'पात्रता नियम (Rules Configurator)', href: '/admin/rules' }
    ],
    answers: {
      hi: {
        title: 'मेरिट स्कोर की गणना कैसे होती है? (Composite Merit Engine)',
        body: [
          'TribalSetu में किसी भी मानवीय पक्षपात के बिना पारदर्शी एल्गोरिदम द्वारा मेरिट तैयार की जाती है:',
          '• **कंपोजिट फॉर्मूला (Composite Formula)**:',
          '  `Merit Score = (0.40 × शैक्षणिक अंक %) + (0.40 × संस्थान NIRF/QS रैंकिंग) + (0.20 × सामाजिक-आर्थिक सूचकांक)`',
          '• **घटक विवरण**:',
          '  - **40% शैक्षणिक प्राप्तांक**: स्नातकोत्तर/स्नातक में प्राप्त सामान्यीकृत प्रतिशत।',
          '  - **40% संस्थान स्तर**: NIRF Top 50 अथवा QS Top 500 विश्वविद्यालयों को अधिकतम 40 अंक।',
          '  - **20% सामाजिक-आर्थिक स्थिति**: ₹3 लाख से कम वार्षिक आय एवं PVTG आवेदकों को अधिकतम 20 अंक।',
          '• परिणाम `/admin/merit` पर पारदर्शी लीडरबोर्ड के रूप में लाइव देखा जा सकता है।'
        ]
      },
      en: {
        title: 'How is the Transparent Merit Score Calculated?',
        body: [
          'TribalSetu calculates selection ranks deterministically using an unbiased three-pillar evaluation engine:',
          '• **Formula**: `Score = (0.40 × Academic %) + (0.40 × Institution Tier) + (0.20 × Socio-Economic Index)`',
          '• **Breakdown**:',
          '  - **40% Academic Excellence**: Normalized qualifying marks percentage.',
          '  - **40% University Tier**: QS Top 500 (NOS) or NIRF Top 100 (NFST) tier scoring.',
          '  - **20% Socio-Economic Need**: Higher priority points for lower income slabs (< ₹3L) and PVTG categories.',
          '• Live ranks and gazette exports are available on `/admin/merit`.'
        ]
      }
    }
  },
  {
    id: 'application_steps',
    category: 'Process',
    keywords: [
      'apply', 'how to apply', 'process', 'steps', 'registration', 'form', 'आवेदन', 'कैसे करें', 'प्रक्रिया', 'रजिस्ट्रेशन', 'फॉर्म', 'अर्जी'
    ],
    actionLinks: [
      { label: 'आवेदन शुरू करें (Start Application)', href: '/student/apply' },
      { label: 'छात्र लॉगिन (Student Login)', href: '/student/login' }
    ],
    answers: {
      hi: {
        title: 'TribalSetu पर आवेदन करने की 4-चरणीय प्रक्रिया',
        body: [
          '1. **चरण 1: व्यक्तिगत एवं जनजातीय प्रोफाइल**: अपना आधार नंबर डालकर ई-केवाईसी करें, अपनी मान्यता प्राप्त जनजाति (Santhal, Gond, Bhil, Oraon आदि) और वार्षिक आय दर्ज करें।',
          '2. **चरण 2: योजना एवं शैक्षणिक चयन**: NFST (भारत में Ph.D.) अथवा NOS (विदेश में डिग्री) चुनें, विश्वविद्यालय और शोध विषय भरें।',
          '3. **चरण 3: डिजिटल दस्तावेज़ वॉल्ट**: जाति प्रमाण-पत्र, आय प्रमाण-पत्र, मार्कशीट और एडमिशन लेटर अपलोड करें। हमारा AI OCR तुरंत इनकी वैधता जांचेगा।',
          '4. **चरण 4: पावती एवं ट्रैकिंग**: आवेदन सबमिट करें और अपना अनूठा ट्रैकिंग नंबर (जैसे `NFST-2026-0842`) प्राप्त करें।'
        ]
      },
      en: {
        title: '4-Step Application Guide',
        body: [
          '1. **Step 1: Personal Profile & e-KYC**: Complete Aadhaar OTP verification, enter recognized tribal affiliation and income details.',
          '2. **Step 2: Scheme & Academics**: Select NFST (India PhD) or NOS (Foreign Master\'s/PhD), enter institution NIRF/QS credentials.',
          '3. **Step 3: Document Vault**: Upload ST Certificate, Income Certificate, Degree Marksheets, and Offer Letter with live OCR inspection.',
          '4. **Step 4: Submission & Tracking**: Obtain permanent reference ID (e.g., `NFST-2026-0842`) and track live progress on dashboard.'
        ]
      }
    }
  },
  {
    id: 'pfms_stipend',
    category: 'Finance',
    keywords: [
      'stipend', 'payment', 'money', 'dbt', 'pfms', 'bank', 'disbursement', 'स्टाइपेंड', 'पैसा', 'खाता', 'डीबीटी', 'पीएफएमएस', 'राशि', 'भुगतान'
    ],
    actionLinks: [
      { label: 'विद्यार्थी डैशबोर्ड (Scholar Dashboard)', href: '/student/dashboard' },
      { label: 'वित्तीय विश्लेषण (Admin Analytics)', href: '/admin/analytics' }
    ],
    answers: {
      hi: {
        title: 'स्टाइपेंड भुगतान एवं PFMS डायरेक्ट बेनिफिट ट्रांसफर (DBT)',
        body: [
          '• **डायरेक्ट बैंक ट्रांसफर**: चयन उपरांत छात्रवृत्ति राशि सीधे आपके आधार-लिंक्ड बैंक खाते में PFMS (Public Financial Management System) द्वारा क्रेडिट की जाती है।',
          '• **मासिक भुगतान चक्र**: हर माह की पहली तारीख को DBT वाउचर जेनरेट होता है।',
          '• **पारदर्शिता**: छात्र अपने डैशबोर्ड पर UTR ट्रांजेक्शन नंबर, बैंक रेफरेंस और संवितरण स्थिति (PFMS Disbursed) को रीयल-टाइम में ट्रैक कर सकते हैं।'
        ]
      },
      en: {
        title: 'Stipend Disbursement & PFMS Direct Benefit Transfer (DBT)',
        body: [
          '• **Direct to Bank**: All fellowship grants are disbursed directly into the scholar\'s Aadhaar-seeded bank account via PFMS.',
          '• **Monthly Schedule**: Routine monthly disbursements processed with automated voucher generation.',
          '• **Full Transparency**: Track live UTR transaction references, credit date stamps, and sanction voucher numbers on `/student/dashboard`.'
        ]
      }
    }
  },
  {
    id: 'officer_workbench',
    category: 'Officer',
    keywords: [
      'officer', 'scrutiny', 'desk', 'workbench', 'verify', 'bounding box', 'अधिकारी', 'स्क्रूटनी', 'सत्यापन अधिकारी', 'जांच'
    ],
    actionLinks: [
      { label: 'अधिकारी स्क्रूटनी डेस्क (Scrutiny Workbench)', href: '/officer/scrutiny' },
      { label: 'आवेदन कतार (Application Queue)', href: '/officer/applications' }
    ],
    answers: {
      hi: {
        title: 'अधिकारी डेस्क स्क्रूटनी एवं AI वर्कबेंच',
        body: [
          '• MoTA सत्यापन अधिकारियों के लिए एक आधुनिक **Split-Screen Scrutiny Workbench** बनाया गया है।',
          '• **Left Screen**: ओरिजिनल सरकारी प्रमाण-पत्र विजुअल कैनवस पर दिखता है, जिसमें नाम, जाति, जारी तिथि पर इंटरएक्टिव AI Bounding Boxes होते हैं।',
          '• **Right Screen**: छात्र द्वारा भरे डेटा और AI OCR द्वारा निकाले गए डेटा का आमने-सामने मिलान (Side-by-side Cross-Check) होता है।',
          '• अधिकारी एक क्लिक में "Approve", "Raise Deficiency" (कारण सहित), अथवा "Reject" कर सकते हैं।'
        ]
      },
      en: {
        title: 'Officer Desk Scrutiny & AI Inspection Workbench',
        body: [
          '• MoTA scrutiny officers utilize a split-screen verification interface on `/officer/scrutiny`.',
          '• **Left Screen**: Interactive document viewer with clickable OCR bounding boxes over revenue seals, certificate numbers, and dates.',
          '• **Right Screen**: AI comparison matrix contrasting applicant form inputs with extracted document values.',
          '• 1-click decisions: Approve to merit pool, raise deficiency with custom guidance, or reject with formal audit reasoning.'
        ]
      }
    }
  },
  {
    id: 'helpline_contact',
    category: 'Contact',
    keywords: [
      'contact', 'phone', 'email', 'help', 'helpline', 'toll free', 'address', 'संपर्क', 'हेल्पलाइन', 'फोन', 'पता', 'मदद'
    ],
    actionLinks: [
      { label: 'मुख्य पृष्ठ (Back to Home)', href: '/' }
    ],
    answers: {
      hi: {
        title: 'जनजातीय कार्य मंत्रालय (MoTA) संपर्क एवं हेल्पलाइन',
        body: [
          '• **टोल-फ्री राष्ट्रीय हेल्पलाइन (Toll-Free Helpline)**: 1800-11-7777 (प्रातः 9:00 से सायं 6:00 बजे तक)',
          '• **ईमेल सहायता (Official Email)**: helpdesk-tribalsetu@gov.in / support.mota@nic.in',
          '• **कार्यालय पता**: जनजातीय कार्य मंत्रालय, शास्त्री भवन, डॉ. राजेन्द्र प्रसाद रोड, नई दिल्ली - 110001, भारत।',
          '• **CPGRAMS निवारण**: प्रशासनिक संशय या शिकायत हेतु CPGRAMS राष्ट्रीय पोर्टल पर भी शिकायत दर्ज कर सकते हैं।'
        ]
      },
      en: {
        title: 'Ministry of Tribal Affairs Contact & Support',
        body: [
          '• **National Toll-Free Helpline**: 1800-11-7777 (Mon-Sat, 9:00 AM - 6:00 PM IST)',
          '• **Email Support**: helpdesk-tribalsetu@gov.in / support.mota@nic.in',
          '• **Secretariat Address**: Ministry of Tribal Affairs, Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001, India.',
          '• **Grievance Redressal**: Integrated with CPGRAMS central public grievance monitoring system.'
        ]
      }
    }
  }
];

// Localized greetings for all 32 languages
export const GREETINGS_BY_LANG: { [code: string]: { welcome: string; placeholder: string; prompt: string } } = {
  hi: { welcome: 'नमस्ते! मैं जनजातीय साथी हूँ। TribalSetu और MoTA योजनाओं से जुड़ी किसी भी सहायता के लिए पूछें।', placeholder: 'अपनी भाषा में प्रश्न पूछें...', prompt: 'त्वरित प्रश्न चुनें:' },
  en: { welcome: 'Hello! I am TribalMitra AI. How can I assist you regarding MoTA fellowships, applications, or document rules?', placeholder: 'Ask a question in any language...', prompt: 'Suggested Topics:' },
  sat: { welcome: 'ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ TribalMitra AI ᱠᱟᱹᱱᱟᱹᱧ᱾ MoTA ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱵᱟᱵᱚᱛ ᱡᱟᱦᱟᱸᱱᱟᱜ ᱜᱮ ᱠᱩᱞᱤ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱢ᱾', placeholder: 'ᱠᱩᱠᱞᱤ ᱚᱞ ᱢᱮ...', prompt: 'ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱥᱟᱛᱟᱢ:' },
  bn: { welcome: 'নমস্কার! আমি ট্রাইবাল মিত্র এআই। MoTA স্কলারশিপ বা আবেদন সম্পর্কিত যেকোনো সাহায্য করতে পারি।', placeholder: 'আপনার ভাষায় প্রশ্ন করুন...', prompt: 'জনপ্রিয় বিষয়:' },
  te: { welcome: 'నమస్కారం! నేను ట్రైబల్ మిత్ర AI ని. MoTA ఫెలోషిప్‌లు లేదా దరఖాస్తులపై మీకు ఎలా సహాయపడగలను?', placeholder: 'మీ ప్రశ్నను ఇక్కడ అడగండి...', prompt: 'ముఖ్యమైన అంశాలు:' },
  mr: { welcome: 'नमस्कार! मी ट्रायबल मित्र AI आहे. MoTA फेलोशिप किंवा अर्जाबाबत काहीही विचारा.', placeholder: 'येथे प्रश्न विचारा...', prompt: 'महत्त्वाचे विषय:' },
  ta: { welcome: 'வணக்கம்! நான் TribalMitra AI. MoTA உதவித்தொகை மற்றும் விண்ணப்பம் பற்றி ஏதேனும் கேட்கவும்.', placeholder: 'உங்கள் கேள்வியை தட்டச்சு செய்யவும்...', prompt: 'முக்கிய தலைப்புகள்:' },
  gu: { welcome: 'નમસ્તે! હું ટ્રાઇબલ મિત્ર AI છું. MoTA ફેલોશિપ અથવા અરજી અંગે કોઈપણ પ્રશ્ન પૂછો.', placeholder: 'તમારો પ્રશ્ન અહીં લખો...', prompt: 'મુખ્ય વિષયો:' },
  ur: { welcome: 'آداب! میں قبائلی دوست AI ہوں۔ MoTA وظائف یا درخواست کے متعلق کوئی بھی سوال پوچھیں۔', placeholder: 'اپنا سوال یہاں لکھیں...', prompt: 'اہم موضوعات:' },
  kn: { welcome: 'ನಮಸ್ಕಾರ! ನಾನು ಟ್ರೈಬಲ್ ಮಿತ್ರ AI. MoTA ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಥವಾ ಅರ್ಜಿಯ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.', placeholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಕೇಳಿ...', prompt: 'ಪ್ರಮುಖ ವಿಷಯಗಳು:' },
  ml: { welcome: 'നമസ്കാരം! ഞാൻ ട്രൈബൽ മിത്ര AI ആണ്. MoTA ഫെലോഷിപ്പിനെക്കുറിച്ചോ അപേക്ഷകളെക്കുറിച്ചോ ചോദിക്കാം.', placeholder: 'ചോദ്യം ഇവിടെ ചോദിക്കുക...', prompt: 'പ്രധാന വിഷയങ്ങൾ:' },
  or: { welcome: 'ନମସ୍କାର! ମୁଁ TribalMitra AI। MoTA ଫେଲୋସିପ୍ କିମ୍ବା ଆବେଦନ ବିଷୟରେ କିଛି ବି ପଚାରନ୍ତୁ।', placeholder: 'ଏଠାରେ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...', prompt: 'ମୁଖ୍ୟ ବିଷୟ:' },
  pa: { welcome: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਟਰਾਈਬਲ ਮਿੱਤਰ AI ਹਾਂ। MoTA ਫੈਲੋਸ਼ਿਪ ਜਾਂ ਅਰਜ਼ੀ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।', placeholder: 'ਆਪਣਾ ਸਵਾਲ ਇੱਥੇ ਪੁੱਛੋ...', prompt: 'ਮੁੱਖ ਵਿਸ਼ੇ:' },
  as: { welcome: 'নমস্কাৰ! মই ট্রাইবেল মিত্র AI। MoTA জলপানি বা আবেদন সম্পর্কে যিকোনো প্রশ্ন সুধিব পাৰে।', placeholder: 'আপোনাৰ প্রশ্ন ইয়াত লিখক...', prompt: 'গুৰুত্বপূর্ণ বিষয়:' },
  mai: { welcome: 'प्रणाम! हम जनजातीय साथी छी। छात्रवृत्ति आ आवेदन संबंधित कोनो प्रश्न पूछू।', placeholder: 'अपन प्रश्न पूछू...', prompt: 'मुख्य विषय:' },
  brx: { welcome: 'खुलुमबाय! आं TribalMitra AI। MoTA फेलोशिप आरो एप्लिकेसननि बागै सोंनो हागोन।', placeholder: 'सोंनाय लिर...', prompt: 'गाहाय आयदा:' },
  gon: { welcome: 'सेवा जोहार! नन्ना TribalMitra AI आंदोन। योजना ना बारे ते बतकेना पुछा कीम।', placeholder: 'सवाल पुछा कीम...', prompt: 'मुख्य विषय:' },
  bhl: { welcome: 'राम राम! हूँ ट्राइबल मित्र AI छूँ। छात्रवृत्ति ने फार्म बारे कई बी पूछो।', placeholder: 'सवात लिखो...', prompt: 'खास बात:' },
  ho: { welcome: 'ᱡᱚᱦᱟᱨ! ᱟᱹᱞᱤᱝ TribalMitra AI ᱛᱟᱹᱱᱤᱝ᱾ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱨᱮᱭᱟᱜ ᱠᱩᱞᱤ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱯᱮ᱾', placeholder: 'ᱠᱩᱠᱞᱤ ᱚᱞᱮᱢᱮ...', prompt: 'ᱢᱩᱬᱩᱛ ᱥᱟᱛᱟᱢ:' },
  miz: { welcome: 'Chibai! TribalMitra AI ka ni a. MoTA fellowship leh scholarship chungchangah engpawh min zawt thei ang.', placeholder: 'Zawt rawh le...', prompt: 'Topics:' },
  kha: { welcome: 'Khublei! Nga dei ka TribalMitra AI. Pynpaw ia ki jingkylli shaphang ki scholarship MoTA.', placeholder: 'Buh jingkylli...', prompt: 'Ki mat ba kongsan:' },
  gar: { welcome: 'Salam! Anga TribalMitra AI. MoTA scholarship-rangni gimin sing·na man·gen.', placeholder: 'Sing·ani...', prompt: 'Mongsonggipa:' },
  mni: { welcome: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯑꯩꯍꯥꯛ TribalMitra AI ꯅꯤ। MoTA ꯁ꯭ꯀꯣꯂꯥꯔꯁꯤꯞꯀꯤ ꯃꯇꯥꯡꯗ ꯍꯪꯕ ꯌꯥꯒꯅꯤ।', placeholder: 'ꯋꯥꯍꯪ ꯏꯕꯤꯌ 格...', prompt: 'ꯃꯔꯨꯑꯣꯏꯕ:' },
  ks: { welcome: 'سلام! بہ چھُس TribalMitra AI۔ MoTA فیلوشپ متعلق کانہہ تہِ سوال پرژھیو۔', placeholder: 'سوال لیویو...', prompt: 'اہم موضوعات:' },
  ne: { welcome: 'नमस्ते! म TribalMitra AI हुँ। MoTA फेलोशिप र आवेदन बारे कुनै पनि प्रश्न सोध्नुहोस्।', placeholder: 'प्रश्न सोध्नुहोस्...', prompt: 'मुख्य विषयहरू:' },
  sd: { welcome: 'نمسڪار! مان ٽرائبل متر AI آهيان. اسڪالرشپ بابت سوال پڇو.', placeholder: 'سوال لکو...', prompt: 'مکيه موضوع:' },
  kok: { welcome: 'नमस्कार! हांव TribalMitra AI. MoTA फेलोशिप वा अर्जा विशीं विचारात.', placeholder: 'विचार करात...', prompt: 'मुख्या विशय:' },
  doi: { welcome: 'नमस्ते! मैं जनजातीय साथी आं। छात्रवृत्ति ते अर्जी बारै कोई बी गल्ल पुच्छो।', placeholder: 'सुआल पुच्छो...', prompt: 'मुक्ख विषय:' },
  sa: { welcome: 'नमस्ते! अहं जनजातीयमित्रम् AI अस्मि। MoTA छात्रवृत्तिविषये किमपि पृच्छन्तु।', placeholder: 'प्रश्नं पृच्छन्तु...', prompt: 'मुख्याः विषयाः:' },
  bho: { welcome: 'प्रणाम! हम जनजातीय साथी हईं। छात्रवृत्ति चाहे फार्म के बारे में कुछ भी पूछीं।', placeholder: 'अपन सवाल पूछीं...', prompt: 'खास सवाल:' },
  chg: { welcome: 'जय जोहार! मैं जनजातीय साथी हरंव। छात्रवृत्ति अऊ आवेदन बर कुछू घलो पूछव।', placeholder: 'सवाल लिखव...', prompt: 'मुख्य विषय:' },
  raj: { welcome: 'खम्मा घणी! म्हूँ ट्राइबल मित्र AI हूँ। छात्रवृत्ति अर अर्जी बाबत कीं भी पूछो।', placeholder: 'सवाल पूछो...', prompt: 'खास बात:' }
};

export const POPULAR_QUESTIONS_BY_LANG: { [code: string]: string[] } = {
  hi: [
    'NFST फेलोशिप की पात्रता और स्टाइपेंड क्या है?',
    'विदेश में पढ़ाई (NOS) के लिए कौन से नियम हैं?',
    'दस्तावेज़ में Deficiency (कमी) कैसे हल करें?',
    'मेरिट लिस्ट कैसे तैयार की जाती है?',
    'आवेदन करने के 4 आसान चरण क्या हैं?'
  ],
  en: [
    'What is the eligibility & stipend for NFST?',
    'How to get National Overseas Scholarship (NOS)?',
    'How to resolve document deficiency?',
    'How is the transparent merit score computed?',
    'What are the 4 steps to apply on TribalSetu?'
  ],
  sat: [
    'NFST ᱯᱷᱮᱞᱳᱥᱤᱯ ᱨᱮᱭᱟᱜ ᱱᱤᱭᱚᱢ ᱟᱨ ᱥᱴᱟᱭᱯᱮᱱᱰ ᱪᱮᱫ?',
    'NOS ᱵᱤᱫᱮᱥ ᱯᱟᱲᱦᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱞᱟᱹᱠᱛᱤᱭᱟ?',
    'Deficiency ᱪᱮᱠᱟᱛᱮ ᱥᱚᱞᱵᱽ ᱦᱩᱭᱩᱜ-ᱟ?'
  ],
  bn: [
    'NFST ফেলোশিপের যোগ্যতা ও স্টাইপেন্ড কত?',
    'NOS বিদেশের স্কলারশিপের নিয়ম কি?',
    'Deficiency বা নথির ত্রুটি কীভাবে ঠিক করব?'
  ],
  te: [
    'NFST ఫెలోషిప్ అర్హత మరియు స్టైపెండ్ ఎంత?',
    'విదేశీ విద్య (NOS) కోసం నియమాలు ఏమిటి?',
    'Deficiency ఎలా పరిష్కరించాలి?'
  ],
  ta: [
    'NFST உதவித்தொகை தகுதி மற்றும் தொகை என்ன?',
    'வெளிநாட்டு கல்விக்கு (NOS) என்ன தேவை?',
    'ஆவண குறைபாட்டை (Deficiency) எப்படி சரிசெய்வது?'
  ],
  mr: [
    'NFST फेलोशिपची पात्रता आणि स्टायपेंड किती आहे?',
    'परदेशी शिक्षणासाठी (NOS) काय नियम आहेत?',
    'Deficiency कशी सोडवावी?'
  ],
  gu: [
    'NFST ફેલોશિપની પાત્રતા અને સ્ટાઇપેન્ડ કેટલું છે?',
    'વિદેશ અભ્યાસ (NOS) માટેના નિયમો શું છે?',
    'Deficiency કેવી રીતે ઉકેલવી?'
  ]
};

// Intelligent Response Matcher
export function getChatbotResponse(query: string, langCode: string = 'hi'): {
  title: string;
  body: string[];
  tip?: string;
  actionLinks: ActionLink[];
  langCode: string;
} {
  const q = query.toLowerCase().trim();

  // Check matching entry
  let matched: BotKnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of BOT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matched = entry;
    }
  }

  // Fallback if no specific keywords matched
  if (!matched || highestScore === 0) {
    const isEnglish = langCode === 'en';
    return {
      title: isEnglish ? 'TribalMitra AI Assistance' : 'जनजातीय साथी (TribalMitra AI) सहायता',
      body: isEnglish ? [
        'I am **TribalMitra AI**, official virtual assistant for the Ministry of Tribal Affairs (MoTA).',
        'I have complete knowledge of:',
        '• **NFST Fellowship**: ₹38,800/mo JRF stipend for Ph.D. in Indian universities (750 slots).',
        '• **NOS Scholarship**: 100% funded overseas degree in top 500 QS world universities (100 slots).',
        '• **Deficiency Resolution**: 15-day rectification window on `/student/deficiencies`.',
        '• **Merit Score Engine**: Transparent formula based on academic, university tier, and socio-economic index.',
        '• **PFMS Direct Transfer**: Direct Benefit Transfer into Aadhaar-seeded bank account.',
        'Please click any topic below or ask your specific question in any Indian language!'
      ] : [
        'मैं **जनजातीय साथी (TribalMitra AI)** हूँ - जनजातीय कार्य मंत्रालय (MoTA) के पोर्टल का 24x7 ज्ञान सहायक।',
        'मेरे पास पोर्टल की संपूर्ण जानकारी है:',
        '• **NFST फेलोशिप**: भारत में Ph.D. हेतु ₹38,800/माह स्टाइपेंड (750 स्लॉट)।',
        '• **NOS छात्रवृत्ति**: विदेश के टॉप 500 QS विश्वविद्यालयों में 100% खर्च पर उच्च शिक्षा।',
        '• **कमी (Deficiency) समाधान**: 15 दिनों में गलत दस्तावेज़ पुनः अपलोड करने का नियम।',
        '• **मेरिट स्कोर इंजन**: पारदर्शी फॉर्मूला (अंक % + NIRF/QS रैंक + आय सूचकांक)।',
        '• **PFMS DBT ट्रांसफर**: सीधे आपके आधार-लिंक्ड बैंक खाते में भुगतान।',
        'कृपया नीचे दिए गए सुझावों पर क्लिक करें या अपना प्रश्न अपनी भाषा में पूछें!'
      ],
      tip: isEnglish ? 'You can switch between 32 Indian languages anytime.' : 'आप ऊपर दिए गए मेनू से भारत की सभी 32 भाषाओं में बात कर सकते हैं।',
      actionLinks: [
        { label: isEnglish ? 'Apply for Fellowship' : 'नई अर्जी भरें (Apply)', href: '/student/apply' },
        { label: isEnglish ? 'Scholar Login' : 'छात्र लॉगिन (Login)', href: '/student/login' },
        { label: isEnglish ? 'Resolve Deficiency' : 'कमी सुधारें (Deficiency)', href: '/student/deficiencies' }
      ],
      langCode
    };
  }

  // Retrieve translation for user's language, or fallback to Hindi / English
  let answer = matched.answers[langCode];
  if (!answer) {
    answer = matched.answers['hi'] || matched.answers['en'];
  }

  return {
    title: answer.title,
    body: answer.body,
    tip: answer.tip,
    actionLinks: matched.actionLinks,
    langCode
  };
}
