'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  UserCheck, 
  Layers, 
  AlertCircle, 
  FileCheck2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  X,
  CreditCard,
  Lock,
  Bot
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface TourStep {
  id: string;
  badge: {
    hi: string;
    en: string;
  };
  title: {
    [lang: string]: string;
  };
  desc: {
    [lang: string]: string;
  };
  targetComponent: string;
  buttonLabel: {
    [lang: string]: string;
  };
  icon: React.ReactNode;
  accentColor: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'security',
    badge: {
      hi: 'डिजिटल भारत सुरक्षा प्रोटोकॉल • सत्र सुरक्षा',
      en: 'Digital India Security Protocol • Session Security'
    },
    title: {
      hi: 'सत्र सुरक्षा एवं सुरक्षित लॉगआउट',
      en: 'Session Security & Secure Logout',
      bn: 'সেশন নিরাপত্তা এবং সুরক্ষিত লগআউট',
      te: 'సెషన్ భద్రత మరియు సురక్షిత లాగౌట్',
      mr: 'सत्र सुरक्षा आणि सुरक्षित लॉगआउट',
      ta: 'அமர்வு பாதுகாப்பு மற்றும் பாதுகாப்பான வெளியேற்றம்',
      gu: 'સત્ર સુરક્ષા અને સુરક્ષિત લૉગઆઉટ',
      sat: 'ᱥᱮᱥᱚᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱟᱨ ᱥᱩᱨᱚᱠᱷᱤᱭᱟᱹ ᱞᱚᱜᱽ-ᱟᱣᱩᱴ',
      or: 'ସେସନ୍ ସୁରକ୍ଷା ଏବଂ ସୁରକ୍ଷିତ ଲଗଆଉଟ୍',
      pa: 'ਸੈਸ਼ਨ ਸੁਰੱਖਿਆ ਅਤੇ ਸੁਰੱਖਿਅਤ ਲੌਗਆਉਟ'
    },
    desc: {
      hi: 'यह जनजातीय कार्य मंत्रालय का आधिकारिक पोर्टल है। आपकी सुरक्षा हेतु 256-बिट SSL एन्क्रिप्शन सक्रिय रहता है। कार्य समाप्त होने पर शीर्ष पट्टी में "सुरक्षित लॉगआउट" बटन दबाकर अपना सत्र समाप्त करें।',
      en: 'This is the official Ministry portal. All transactions are protected with 256-bit SSL encryption. When your work is completed, click the "सुरक्षित लॉगआउट (Logout)" button in the header to securely end your session.',
      bn: 'এটি মন্ত্রণালয়ের আনুষ্ঠানিক সুরক্ষিত সরকারি পোর্টাল। সমস্ত ডেটা ২৫৬-বিট এসএসএল দ্বারা এনক্রিপ্ট করা হয়েছে। কাজ শেষে "নিরাপদ লগআউট" বোতামে ক্লিক করুন।',
      te: 'ఇది అధికారిక మంత్రిత్వ శాఖ పోర్టల్. మీ సెషన్ 256-బిట్ SSL ద్వారా సురక్షితం చేయబడింది. పని ముగిసిన తర్వాత "సురక్షిత లాగౌట్" బటన్ క్లిక్ చేయండి.',
      mr: 'हे मंत्रालयाचे अधिकृत पोर्टल आहे. आपली माहिती २५६-बिट SSL ने सुरक्षित आहे. काम संपल्यावर शीर्ष पट्टीतील "सुरक्षित लॉगआउट" बटण दाबा.',
      ta: 'இது அமைச்சகத்தின் அதிகாரப்பூர்வ தளம். உங்கள் அமர்வு 256-பிட் SSL மூலம் பாதுகாக்கப்பட்டுள்ளது. பணி முடிந்ததும் "பாதுகாப்பான வெளியேற்றம்" அழுத்தவும்.',
      gu: 'આ મંત્રાલયનું સત્તાવાર પોર્ટલ છે. તમારી સુરક્ષા માટે ૨૫૬-બીટ SSL સક્રિય છે. કાર્ય પૂર્ણ થયા પછી "સુરક્ષિત લૉગઆઉટ" બટન દબાવો.',
      sat: 'ᱱᱚᱣᱟ ᱫᱚ ᱥᱚᱨᱠᱟᱨᱤ ᱢᱚᱱᱛᱨᱟᱞᱚᱭ ᱯᱚᱨᱴᱟᱞ ᱠᱟᱱᱟ᱾ ᱠᱟᱹᱢᱤ ᱪᱟᱵᱟ ᱞᱮᱱᱠᱷᱟᱱ ᱪᱮᱛᱟᱱ ᱨᱮ "ᱥᱩᱨᱚᱠᱷᱤᱭᱟᱹ ᱞᱚᱜᱽ-ᱟᱣᱩᱴ" ᱚᱛᱟ ᱢᱮ᱾',
      or: 'ଏହା ଏକ ସୁରକ୍ଷିତ ସରକାରୀ ପୋର୍ଟାଲ। କାର୍ଯ୍ୟ ସରିବା ପରେ ଶୀର୍ଷ ପଟିରେ ଥିବା "ସୁରକ୍ଷିତ ଲଗଆଉଟ୍" ବଟନ୍ ଦବାନ୍ତୁ।',
      pa: 'ਇਹ ਮੰਤਰਾਲੇ ਦਾ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਹੈ। ਕੰਮ ਖ਼ਤਮ ਹੋਣ ਤੇ ਉੱਪਰਲੀ ਪੱਟੀ ਵਿੱਚ "ਸੁਰੱਖਿਅਤ ਲੌਗਆਉਟ" ਬਟਨ ਦਬਾਓ।'
    },
    targetComponent: 'Header Secure Logout Button',
    buttonLabel: {
      hi: '🔒 [सुरक्षित लॉगआउट]',
      en: '🔒 [Secure Logout]'
    },
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    accentColor: 'from-[#0a2540] to-slate-900'
  },
  {
    id: 'language',
    badge: {
      hi: 'बहुभाषी सहायता • 32+ भारतीय भाषाएं',
      en: 'Multilingual Engine • 32+ Indian Languages'
    },
    title: {
      hi: 'अपनी मातृभाषा में पोर्टल का उपयोग करें',
      en: 'Use the Portal in Your Native Mother Tongue',
      bn: 'আপনার মাতৃভাষায় পোর্টালটি ব্যবহার করুন',
      te: 'మీ మాతృభాషలో పోర్టల్‌ను ఉపయోగించండి',
      mr: 'आपल्या मातृभाषेत पोर्टल वापरा',
      ta: 'உங்கள் தாய்மொழியில் தளத்தைப் பயன்படுத்துங்கள்',
      gu: 'તમારી માતૃભાષામાં પોર્ટલનો ઉપયોગ કરો',
      sat: 'ᱟᱢᱟᱜ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱯᱚᱨᱴᱟᱞ ᱵᱮᱵᱷᱟᱨ ᱢᱮ',
      or: 'ଆପଣଙ୍କ ମାତୃଭାଷାରେ ପୋର୍ଟାଲ୍ ବ୍ୟବହାର କରନ୍ତୁ',
      pa: 'ਆਪਣੀ ਮਾਤ ਭਾਸ਼ਾ ਵਿੱਚ ਪੋਰਟਲ ਦੀ ਵਰਤੋਂ ਕਰੋ'
    },
    desc: {
      hi: 'शीर्ष पट्टी में "🌐 [भाषा चुनें]" बटन पर क्लिक करके संथाली (Ol Chiki), गोंडी, भीली, हिन्दी, बांग्ला, तेलुगु, मराठी, गुजराती, तमिल व अन्य 32+ भाषाओं में तुरंत स्विच करें। पूरी वेबसाइट और एआई चैटबॉट उसी भाषा में काम करेंगे।',
      en: 'Click the "🌐 [Language Selector]" in the top bar to switch immediately between Santhali (Ol Chiki), Gondi, Bhili, Hindi, Bengali, Telugu, Marathi, Gujarati, Tamil, etc. All forms, alerts and the AI chatbot adapt automatically.',
      bn: 'শীর্ষ বারে "🌐 [ভাষা নির্বাচন]" এ ক্লিক করে সাঁওতালি, বাংলা, হিন্দি ইত্যাদিতে তাত্ক্ষণিক পরিবর্তন করুন।',
      te: 'పై బార్‌లో "🌐 [భాష]" పై క్లిక్ చేసి సంథాలీ, తెలుగు, హిందీ మొదలైన భాషలలోకి మారండి.',
      mr: 'वरच्या पट्टीतील "🌐 [भाषा]" पर्यायावर क्लिक करून संथाली, मराठी, हिंदी इत्यादी भाषा निवडा.',
      ta: 'மேல் பட்டியில் உள்ள "🌐 [மொழி]" என்பதை கிளிக் செய்து சந்தாளி, தமிழ், இந்தி போன்ற மொழிகளுக்கு மாறுங்கள்.',
      gu: 'ટોચની પટ્ટીમાં "🌐 [ભાષા પસંદ કરો]" પર ક્લિક કરીને સંથાલી, ગુજરાતી, હિન્દી વગેરેમાં સ્વિચ કરો.',
      sat: 'ᱪᱮᱛᱟᱱ ᱨᱮ "🌐 [ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ]" ᱨᱮ ᱚᱛᱟ ᱠᱟᱛᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ, ᱦᱤᱱᱫᱤ ᱮᱢᱟᱱ ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾',
      or: 'ଉପର ପଟିରେ "🌐 [ଭାଷା ଚୟନ]" ଉପରେ କ୍ଲିକ୍ କରି ସାନ୍ତାଳୀ, ଓଡ଼ିଆ, ହିନ୍ଦୀ ଇତ୍ୟାଦିକୁ ପରିବର୍ତ୍ତନ କରନ୍ତୁ।',
      pa: 'ਉੱਪਰਲੀ ਪੱਟੀ ਵਿੱਚ "🌐 [ਭਾਸ਼ਾ]" ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਸੰਥਾਲੀ, ਪੰਜਾਬੀ, ਹਿੰਦੀ ਆਦਿ ਵਿੱਚ ਬਦਲੋ।'
    },
    targetComponent: 'Header Globe Dropdown (🌐 [हिन्दी ▼])',
    buttonLabel: {
      hi: '🌐 [हिन्दी ▼] • 32+ भाषाएं',
      en: '🌐 [English ▼] • 32+ Languages'
    },
    icon: <Globe className="w-8 h-8 text-emerald-500" />,
    accentColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'roles',
    badge: {
      hi: 'भूमिका चयनकर्ता • रोल आधारित कार्यक्षेत्र',
      en: 'Persona Switcher • Role-Based Workspaces'
    },
    title: {
      hi: 'छात्र, अधिकारी व प्रशासक भूमिकाएं बदलें',
      en: 'Switch Roles Between Scholar, Officer & Admin',
      bn: 'শিক্ষার্থী, কর্মকর্তা এবং প্রশাসকের ভূমিকা পরিবর্তন করুন',
      te: 'విద్యార్థి, అధికారి మరియు అడ్మిన్ పాత్రలను మార్చుకోండి',
      mr: 'विद्यार्थी, अधिकारी आणि प्रशासक भूमिका बदला',
      ta: 'மாணவர், அதிகாரி மற்றும் நிர்வாகி பாத்திரங்களை மாற்றவும்',
      gu: 'વિદ્યાર્થી, અધિકારી અને એડમિન ભૂમિકાઓ બદલો',
      sat: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ, ᱚᱯᱷᱤᱥᱟᱨ ᱟᱨ ᱮᱰᱢᱤᱱ ᱨᱳᱞ ᱵᱚᱫᱚᱞ ᱢᱮ',
      or: 'ଛାତ୍ର, ଅଧିକାରୀ ଏବଂ ପ୍ରଶାସକ ଭୂମିକା ପରିବର୍ତ୍ତନ କରନ୍ତୁ',
      pa: 'ਵਿਦਿਆਰਥੀ, ਅਧਿਕਾਰੀ ਅਤੇ ਪ੍ਰਬੰਧਕ ਦੀਆਂ ਭੂਮਿਕਾਵਾਂ ਬਦਲੋ'
    },
    desc: {
      hi: 'शीर्ष-दाएं कोने में प्रोफाइल बटन पर क्लिक करके छात्र (बिरसा मुंडा / शांति उरांव), संवीक्षा अधिकारी (डॉ. राजेश वर्मा), या मंत्रालय प्रशासक (श्रीमती सुनीता मुर्मू IAS) के रूप में संपूर्ण कार्यप्रवाह का परीक्षण करें।',
      en: 'Click your profile button in the top-right corner to test workflows as Birsa Munda (Flagged deficiency), Shanti Oraon (NOS scholar), Dr. Rajesh Verma (Scrutiny Officer), or Smt. Sunita Murmu (MoTA Admin).',
      bn: 'শীর্ষ ডানদিকের প্রোফাইল বোতামে ক্লিক করে শিক্ষার্থী, যাচাইকরণ কর্মকর্তা বা প্রশাসকে স্যুইচ করুন।',
      te: 'కుడివైపు పైభాగంలో ఉన్న ప్రొఫైల్ బటన్‌ను క్లిక్ చేసి వివిధ అధికారుల పాత్రలను పరీక్షించండి.',
      mr: 'उजव्या कोपऱ्यातील प्रोफाईल बटणावर क्लिक करून विद्यार्थी, अधिकारी किंवा ॲडमिन म्हणून काम तपासा.',
      ta: 'மேல் வலது மூலையில் உள்ள சுயவிவர பொத்தானை கிளிக் செய்து வெவ்வேறு பாத்திரங்களை சோதிக்கவும்.',
      gu: 'ટોચના જમણા ખૂણે પ્રોફાઇલ બટન પર ક્લિક કરીને વિદ્યાર્થી, અધિકારી કે એડમિન તરીકે પરીક્ષણ કરો.',
      sat: 'ᱪᱮᱛᱟᱱ ᱡᱚᱡᱚᱢ ᱠᱳᱬ ᱨᱮ ᱯᱨᱳᱯᱷᱟᱭᱤᱞ ᱵᱟᱴᱚᱱ ᱚᱛᱟ ᱠᱟᱛᱮ ᱵᱷᱮᱜᱟᱨ ᱵᱷᱮᱜᱟᱨ ᱠᱟᱹᱢᱤ ᱯᱟᱨᱠᱷᱟᱣ ᱢᱮ᱾',
      or: 'ଉପର ଡାହାଣ କୋଣରେ ଥିବା ପ୍ରୋଫାଇଲ୍ ବଟନ୍ କ୍ଲିକ୍ କରି ବିଭିନ୍ନ ଭୂମିକା ପରୀକ୍ଷା କରନ୍ତୁ।',
      pa: 'ਉੱਪਰ ਸੱਜੇ ਕੋਨੇ ਵਿੱਚ ਪ੍ਰੋਫਾਈਲ ਬਟਨ ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਵਿਦਿਆਰਥੀ ਜਾਂ ਅਧਿਕਾਰੀ ਦੀ ਭੂਮਿਕਾ ਵਿੱਚ ਜਾਓ।'
    },
    targetComponent: 'Header Profile Dropdown (User Switcher)',
    buttonLabel: {
      hi: '👤 [बिरसा मुंडा ▼] • [रोल बदलें]',
      en: '👤 [Birsa Munda ▼] • [Switch Persona]'
    },
    icon: <UserCheck className="w-8 h-8 text-blue-500" />,
    accentColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'stepper',
    badge: {
      hi: 'आवेदन प्रगति • 5-चरणीय लाइव स्टेटस',
      en: 'Live Progress • 5-Stage Status Stepper'
    },
    title: {
      hi: '5-चरणीय पारदर्शी छात्रवृत्ति प्रगति ट्रैकर',
      en: '5-Stage Transparent Fellowship Status Stepper',
      bn: '৫-ধাপের স্বচ্ছ ফেলোশিপ অগ্রগতি ট্র্যাকার',
      te: '5-దశల పారదర్శక ఫెలోషిప్ స్థితి ట్రాకర్',
      mr: '५-टप्प्यांचा पारदर्शक फेलोशिप प्रगती ट्रॅकर',
      ta: '5-படிநிலை உதவித்தொகை முன்னேற்ற கண்காணிப்பு',
      gu: '૫-તબક્કાનું પારદર્શક ફેલોશિપ સ્ટેટસ ટ્રેકર',
      sat: '᱕-ᱫᱷᱟᱯ ᱨᱮᱭᱟᱜ ᱯᱷᱮᱞᱳᱥᱤᱯ ᱞᱟᱦᱟᱱᱛᱤ ᱴᱨᱮᱠᱟᱨ',
      or: '୫-ପର୍ଯ୍ୟାୟ ବିଶିଷ୍ଟ ଫେଲୋସିପ୍ ସ୍ଥିତି ଟ୍ରାକର୍',
      pa: '5-ਪੜਾਵੀ ਪਾਰਦਰਸ਼ੀ ਫੈਲੋਸ਼ਿਪ ਸਥਿਤੀ ਟਰੈਕਰ'
    },
    desc: {
      hi: 'डैशबोर्ड पर 5 मुख्य चरण दिखाए जाते हैं: 1. आवेदन जमा -> 2. एआई ओसीआर सत्यापन -> 3. अधिकारी स्क्रूटनी -> 4. मेरिट चयन -> 5. स्वीकृत व संवितरित। प्रत्येक चरण की तारीख और स्थिति लाइव अपडेट होती है।',
      en: 'The student dashboard tracks your application through 5 milestones: 1. Submitted -> 2. OCR Verified -> 3. Officer Scrutiny -> 4. Selection -> 5. DBT Sanctioned. Timestamps and remarks are visible live.',
      bn: 'ড্যাশবোর্ডে ৫টি ধাপ দেখা যায়: ১. জমা -> ২. ওসিআর যাচাই -> ৩. স্ক্রুটিনি -> ৪. নির্বাচন -> ৫. মঞ্জুর।',
      te: 'డ్యాష్‌బోర్డ్‌లో 5 మైలురాళ్ళు కనిపిస్తాయి: 1. సమర్పణ -> 2. OCR -> 3. పరిశీలన -> 4. ఎంపిక -> 5. మంజూరు.',
      mr: 'डॅशबोर्डवर ५ टप्पे दिसतात: १. अर्ज सादर -> २. OCR तपासणी -> ३. अधिकारी छाननी -> ४. निवड -> ५. मंजूर.',
      ta: 'முகப்பில் 5 நிலைகள் உள்ளன: 1. சமர்ப்பிப்பு -> 2. OCR -> 3. ஆய்வு -> 4. தேர்வு -> 5. அனுமதி.',
      gu: 'ડેશબોર્ડ પર ૫ તબક્કા દર્શાવાય છે: ૧. સબમિટ -> ૨. OCR -> ૩. તપાસ -> ૪. પસંદગી -> ૫. મંજૂર.',
      sat: 'ᱰᱮᱥᱵᱳᱨᱰ ᱨᱮ ᱕ ᱜᱚᱴᱟᱝ ᱫᱷᱟᱯ ᱧᱮᱞᱚᱜ-ᱟ: ᱑. ᱫᱟᱠᱷᱤᱞ -> ᱒. OCR -> ᱓. ᱯᱟᱨᱠᱷᱟᱣ -> ᱔. ᱵᱟᱪᱷᱟᱣ -> ᱕. ᱯᱟᱥ᱾',
      or: 'ଡ୍ୟାସବୋର୍ଡରେ ୫ଟି ପର୍ଯ୍ୟାୟ ପ୍ରଦର୍ଶିତ ହୁଏ: ୧. ଦାଖଲ -> ୨. OCR -> ୩. ଯାଞ୍ଚ -> ୪. ଚୟନ -> ୫. ମଞ୍ଜୁର।',
      pa: 'ਡੈਸ਼ਬੋਰਡ ਤੇ 5 ਪੜਾਅ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ: 1. ਜਮ੍ਹਾਂ -> 2. OCR -> 3. ਜਾਂਚ -> 4. ਚੋਣ -> 5. ਮਨਜ਼ੂਰ।'
    },
    targetComponent: 'StatusStepper Component (Student Dashboard)',
    buttonLabel: {
      hi: '📊 [1. जमा] → [2. OCR] → [3. स्क्रूटनी] → [4. मेरिट] → [5. संवितरित]',
      en: '📊 [1. Submitted] → [2. OCR] → [3. Scrutiny] → [4. Merit] → [5. Sanctioned]'
    },
    icon: <Layers className="w-8 h-8 text-amber-500" />,
    accentColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'deficiency',
    badge: {
      hi: 'कमियों का समाधान • 12-महीने का नियम',
      en: 'Action Center • 12-Month Rule'
    },
    title: {
      hi: 'दस्तावेज़ कमी निवारण और पुनः अपलोड बटन',
      en: 'Document Deficiency Action & Re-Upload Button',
      bn: 'নথির ত্রুটি সমাধান এবং পুনরায় আপলোড বোতাম',
      te: 'పత్ర లోపాల పరిష్కారం & రీ-అప్‌లోడ్ బటన్',
      mr: 'कागदपत्र त्रुटी निवारण आणि री-अपलोड बटण',
      ta: 'ஆவண குறைபாடு தீர்வு மற்றும் மறுபதிவேற்ற பொத்தான்',
      gu: 'દસ્તાવેજ ખામી નિવારણ અને પુનઃ અપલોડ બટન',
      sat: 'ᱠᱟᱜᱚᱡᱽ ᱠᱷᱟᱹᱢᱛᱤ ᱴᱷᱤᱠ ᱟᱨ ᱟᱨᱦᱚᱸ ᱟᱯᱞᱳᱰ ᱵᱟᱴᱚᱱ',
      or: 'ଦସ୍ତାବିଜ୍ ତ୍ରୁଟି ସମାଧାନ ଏବଂ ପୁନଃ ଅପଲୋଡ୍ ବଟନ୍',
      pa: 'ਦਸਤਾਵੇਜ਼ੀ ਕਮੀ ਦੂਰ ਕਰਨ ਅਤੇ ਮੁੜ ਅਪਲੋਡ ਬਟਨ'
    },
    desc: {
      hi: 'यदि अधिकारी किसी प्रमाण पत्र (जैसे पुराना आय प्रमाण पत्र) पर आपत्ति दर्ज करता है, तो डैशबोर्ड पर पीला बैनर दिखाई देता है। "अभी समाधान करें और पुनः अपलोड करें" बटन दबाकर तुरंत नया PDF अपलोड करें ताकि 12 महीने के अंदर छात्रवृत्ति चालू हो सके।',
      en: 'If an officer flags an invalid or expired document (e.g., income certificate > 1 year), an amber alert banner appears. Click "Resolve & Re-Upload Now" to upload a fresh PDF and resume verification without application rejection.',
      bn: 'কোনো নথিতে সমস্যা থাকলে হলুদ ব্যানার দেখা যায়। "এখনই সমাধান ও পুনরায় আপলোড করুন" বোতামে ক্লিক করুন।',
      te: 'పత్రంలో లోపం ఉంటే పసుపు బ్యానర్ కనిపిస్తుంది. వెంటనే సరిదిద్దడానికి బటన్ క్లిక్ చేయండి.',
      mr: 'कागदपत्रात त्रुटी आढळल्यास पिवळा बॅनर दिसेल. "आता दुरुस्ती करा आणि पुन्हा अपलोड करा" बटण दाबा.',
      ta: 'ஆவணத்தில் குறைபாடு இருந்தால் எச்சரிக்கை தோன்றும். உடனடியாக சரிசெய்ய பொத்தானை அழுத்தவும்.',
      gu: 'દસ્તાવેજમાં ખામી હોય તો પીળો બેનર દેખાય છે. તુરંત ઉકેલ માટે બટન દબાવો.',
      sat: 'ᱠᱟᱜᱚᱡᱽ ᱨᱮ ᱠᱷᱟᱹᱢᱛᱤ ᱛᱟᱦᱮᱸᱱ ᱠᱷᱟᱱ "ᱱᱤᱛ ᱜᱮ ᱴᱷᱤᱠ ᱢᱮ ᱟᱨ ᱟᱯᱞᱳᱰ ᱢᱮ" ᱵᱟᱴᱚᱱ ᱚᱛᱟ ᱢᱮ᱾',
      or: 'ଦଲିଲରେ ତ୍ରୁଟି ଥିଲେ ହଳଦିଆ ବ୍ୟାନର୍ ଦେଖାଯାଏ। ତୁରନ୍ତ ସମାଧାନ ପାଇଁ ବଟନ୍ ଦବାନ୍ତୁ।',
      pa: 'ਜੇਕਰ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਨੁਕਸ ਹੋਵੇ ਤਾਂ ਪੀਲਾ ਬੈਨਰ ਦਿਸਦਾ ਹੈ। "ਹੁਣੇ ਹੱਲ ਕਰੋ" ਬਟਨ ਦਬਾਓ।'
    },
    targetComponent: 'Deficiency Banner & Resolve Button',
    buttonLabel: {
      hi: '⚠️ [अभी समाधान करें और पुनः अपलोड करें]',
      en: '⚠️ [Resolve & Re-Upload Now]'
    },
    icon: <AlertCircle className="w-8 h-8 text-amber-600" />,
    accentColor: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'chatbot',
    badge: {
      hi: 'जनजातीय मित्र एआई • 24x7 वर्चुअल सहायक',
      en: 'TribalMitra AI • 24x7 Virtual Assistant'
    },
    title: {
      hi: 'जनजातीय मित्र एआई चैटबॉट से किसी भी भाषा में पूछें',
      en: 'Ask Anything in Any Language to TribalMitra AI',
      bn: 'জনজাতীয় মিত্র এআই চ্যাটবটকে যেকোনো ভাষায় প্রশ্ন করুন',
      te: 'ట్రైబల్‌మిత్ర AI చాట్‌బాట్‌ను ఏ భాషలోనైనా అడగండి',
      mr: 'जनजातीय मित्र एआय चॅटबॉटला कोणत्याही भाषेत विचारा',
      ta: 'பழங்குடியின மித்ரா AI பாட்டிடம் எந்த மொழியிலும் கேளுங்கள்',
      gu: 'જનજાતીય મિત્ર AI ચેટબોટને કોઈપણ ભાષામાં પૂછો',
      sat: 'ᱡᱚᱱᱡᱟᱛᱤᱭᱚ ᱢᱤᱛᱨᱚ AI ᱴᱷᱮᱱ ᱡᱟᱦᱟᱸᱱ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱠᱩᱞᱤ ᱢᱮ',
      or: 'ଜନଜାତୀୟ ମିତ୍ର AI ଚାଟବଟ୍ କୁ ଯେକୌଣସି ଭାଷାରେ ପଚାରନ୍ତୁ',
      pa: 'ਜਨਜਾਤੀ ਮਿੱਤਰ AI ਚੈਟਬੋਟ ਨੂੰ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ'
    },
    desc: {
      hi: 'स्क्रीन के निचले-दाएं कोने में रोबोट आइकन (🤖) पर क्लिक करें। यह एआई सहायक एनएफएसटी, एनओएस, स्टाइपेंड, पात्रता नियमों, ओसीआर सत्यापन और शिकायत निवारण से संबंधित सभी प्रश्नों के उत्तर आपकी चुनी हुई भारतीय भाषा में देता है।',
      en: 'Click the floating AI robot icon (🤖) at the bottom right. TribalMitra understands the entire portal knowledge base (NFST, NOS, stipend rules, income criteria, grievance redressal) and answers fluently in all Indian languages.',
      bn: 'স্ক্রিনের নিচে ডানদিকের রোবট আইকনে ক্লিক করে যেকোনো প্রশ্ন আপনার মাতৃভাষায় জিজ্ঞাসা করুন।',
      te: 'స్క్రీన్ కింద కుడివైపున ఉన్న రోబోట్ చిహ్నాన్ని క్లిక్ చేసి మీ సందేహాలను అడగండి.',
      mr: 'उजव्या बाजूच्या रोबोट आयकॉनवर क्लिक करून फेलोशिप नियमांबद्दल आपल्या भाषेत माहिती मिळवा.',
      ta: 'கீழ் வலது மூலையில் உள்ள ரோபோ பொத்தானை கிளிக் செய்து உங்கள் சந்தேகங்களை தீர்த்துக்கொள்ளுங்கள்.',
      gu: 'નીચે જમણી બાજુના રોબોટ આઇકોન પર ક્લિક કરીને તમારી માતૃભાષામાં સહાય મેળવો.',
      sat: 'ᱞᱟᱛᱟᱨ ᱡᱚᱡᱚᱢ ᱠᱳᱬ ᱨᱮ ᱨᱳᱵᱳᱴ ᱪᱤᱱᱦᱟᱹ ᱚᱛᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤ ᱢᱮ᱾',
      or: 'ତଳ ଡାହାଣ କୋଣରେ ଥିବା ରୋବୋଟ୍ ଆଇକନ୍ କ୍ଲିକ୍ କରି ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।',
      pa: 'ਹੇਠਾਂ ਸੱਜੇ ਕੋਨੇ ਵਿੱਚ ਰੋਬੋਟ ਆਈਕਨ ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਾਣਕਾਰੀ ਲਵੋ।'
    },
    targetComponent: 'Floating TribalMitra Bot Icon',
    buttonLabel: {
      hi: '💬 [जनजातीय मित्र एआई खोलें]',
      en: '💬 [Open TribalMitra AI]'
    },
    icon: <Bot className="w-8 h-8 text-emerald-400" />,
    accentColor: 'from-emerald-700 to-green-800'
  }
];

export default function InteractiveTourGuide() {
  const { showTour, setShowTour, currentUser } = useAuth();
  const { language } = useLanguage();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Localized UI Labels for controls
  const langCode = language.code || 'hi';

  const labels = {
    prev: {
      hi: 'पिछला',
      en: 'Prev',
      bn: 'পূর্ববর্তী',
      te: 'మునుపటి',
      mr: 'मागील',
      ta: 'முந்தைய',
      gu: 'પાછળ',
      sat: 'ᱛᱟᱭᱚᱢ',
      or: 'ପୂର୍ବବର୍ତ୍ତୀ',
      pa: 'ਪਿਛਲਾ'
    }[langCode] || 'Prev',
    next: {
      hi: 'अगला',
      en: 'Next',
      bn: 'পরবর্তী',
      te: 'తదుపరి',
      mr: 'पुढचा',
      ta: 'அடுத்தது',
      gu: 'આગળ',
      sat: 'ᱞᱟᱦᱟ',
      or: 'ପରବର୍ତ୍ତୀ',
      pa: 'ਅਗਲਾ'
    }[langCode] || 'Next',
    skip: {
      hi: 'छोड़ें',
      en: 'Skip Tour',
      bn: 'বাদ দিন',
      te: 'దాటవేయి',
      mr: 'वगळा',
      ta: 'தவிர்',
      gu: 'છોડો',
      sat: 'ᱵᱟᱹᱜᱤ',
      or: 'ଏଡ଼ାଇ ଯାଆନ୍ତୁ',
      pa: 'ਛੱਡੋ'
    }[langCode] || 'Skip',
    finish: {
      hi: 'समाप्त एवं शुरू करें',
      en: 'Finish & Start',
      bn: 'সম্পন্ন ও শুরু করুন',
      te: 'పూర్తి చేసి ప్రారంభించండి',
      mr: 'पूर्ण करा व सुरू करा',
      ta: 'முடித்து தொடங்கவும்',
      gu: 'સમાપ્ત અને પ્રારંભ કરો',
      sat: 'ᱪᱟᱵᱟ ᱟᱨ ᱮᱦᱚᱵ ᱢᱮ',
      or: 'ସମାପ୍ତ ଓ ଆରମ୍ଭ କରନ୍ତୁ',
      pa: 'ਸਮਾਪਤ ਤੇ ਸ਼ੁਰੂ ਕਰੋ'
    }[langCode] || 'Finish',
    guideTitle: {
      hi: 'पोर्टल इंटरैक्टिव गाइड (TribalSetu Tour)',
      en: 'Portal Interactive Tour Guide',
      bn: 'পোর্টাল নির্দেশিকা',
      te: 'పోర్టల్ ఇంటరాక్టివ్ గైడ్',
      mr: 'पोर्टल परस्परसंवादी मार्गदर्शक',
      ta: 'போர்டல் வழிகாட்டி',
      gu: 'પોર્ટલ માર્ગદર્શિકા',
      sat: 'ᱯᱚᱨᱴᱟᱞ ᱫᱤᱥᱟᱹ ᱩᱫᱩᱜ',
      or: 'ପୋର୍ଟାଲ୍ ମାର୍ଗଦର୍ଶିକା',
      pa: 'ਪੋਰਟਲ ਗਾਈਡ'
    }[langCode] || 'Portal Guide',
    stepOf: {
      hi: 'चरण',
      en: 'Step',
      bn: 'ধাপ',
      te: 'దశ',
      mr: 'टप्पा',
      ta: 'படி',
      gu: 'તબક્કો',
      sat: 'ᱫᱷᱟᱯ',
      or: 'ପର୍ଯ୍ୟାୟ',
      pa: 'ਪੜਾਅ'
    }[langCode] || 'Step'
  };

  if (!showTour) return null;

  const currentStep = TOUR_STEPS[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleClose();
    } else {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setShowTour(false);
    if (currentUser) {
      try {
        localStorage.setItem(`tribalsetu_tour_seen_${currentUser.id}`, 'true');
      } catch (e) {
        console.warn('Could not save tour state', e);
      }
    }
  };

  // Get translated texts with fallbacks
  const stepTitle = currentStep.title[langCode] || currentStep.title['hi'] || currentStep.title['en'];
  const stepDesc = currentStep.desc[langCode] || currentStep.desc['hi'] || currentStep.desc['en'];
  const stepBadge = currentStep.badge.hi;
  const targetLabel = currentStep.buttonLabel[langCode] || currentStep.buttonLabel['hi'] || currentStep.buttonLabel['en'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        {/* Top Gradient Header */}
        <div className={`bg-gradient-to-r ${currentStep.accentColor} text-white p-6 sm:p-7 relative overflow-hidden`}>
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg">
                {currentStep.icon}
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-300 block">
                  {stepBadge}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug mt-0.5">
                  {stepTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer shrink-0"
              title="Close Guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="mt-5 flex items-center justify-between text-xs text-white/80 font-bold">
            <span>
              {labels.stepOf} {currentStepIdx + 1} / {TOUR_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {TOUR_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentStepIdx === idx
                      ? 'w-7 bg-amber-300'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Feature Description */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {stepDesc}
          </p>

          {/* Button / Component Preview Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                कंट्रोल / बटन विवरण (Associated UI Element):
              </span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                {currentStep.targetComponent}
              </span>
            </div>
            <div className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl shadow-xs text-xs font-black text-[#0a2540] shrink-0">
              {targetLabel}
            </div>
          </div>

          {/* Official MoTA Security Assurance Note */}
          <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-Bit SSL Encrypted Architecture • Digital India Certified</span>
          </div>

          {/* Footer Controls: Prev, Next, Skip, Finish */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 transition cursor-pointer px-2 py-1"
            >
              {labels.skip}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isFirst}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isFirst
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{labels.prev}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 rounded-xl text-xs font-black bg-[#0a2540] hover:bg-slate-800 text-white shadow-md hover:scale-[1.02] transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isLast ? labels.finish : labels.next}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
