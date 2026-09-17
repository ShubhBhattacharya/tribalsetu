'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_INDIAN_LANGUAGES, SupportedLanguage } from '@/lib/chatbotKnowledge';

export type LanguageCode = string;

export interface TranslationDictionary {
  [key: string]: {
    [lang: string]: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Brand & Top bar
  govIndia: {
    hi: 'भारत सरकार',
    en: 'Government of India',
    bn: 'ভারত সরকার',
    te: 'భారత ప్రభుత్వం',
    mr: 'भारत सरकार',
    ta: 'இந்திய அரசு',
    gu: 'ભારત સરકાર',
    sat: 'ᱵᱷᱟᱨᱚᱛ ᱥᱚᱨᱠᱟᱨ',
    or: 'ଭାରତ ସରକାର',
    pa: 'ਭਾਰਤ ਸਰਕਾਰ'
  },
  mota: {
    hi: 'जनजातीय कार्य मंत्रालय',
    en: 'Ministry of Tribal Affairs',
    bn: 'উপজাতি বিষয়ক মন্ত্রক',
    te: 'గిరిజన వ్యవహారాల మంత్రిత్వ శాఖ',
    mr: 'आदिवासी कार्य मंत्रालय',
    ta: 'பழங்குடியினர் விவகார அமைச்சகம்',
    gu: 'જનજાતિ કાર્ય મંત્રાલય',
    sat: 'ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱢᱚᱱᱛᱨᱟᱞᱚᱭ',
    or: 'ଜନଜାତି ବ୍ୟାପାର ମନ୍ତ୍ରଣାଳୟ',
    pa: 'ਕਬਾਇਲੀ ਮਾਮਲੇ ਮੰਤਰਾਲਾ'
  },
  portalSubtitle: {
    hi: 'एकीकृत छात्रवृत्ति एवं फैलोशिप प्रबंधन प्रणाली',
    en: 'Unified Scholarship & Fellowship Management System',
    bn: 'সমন্বিত বৃত্তি ও ফেলোশিপ ব্যবস্থাপনা পোর্টাল',
    te: 'సమగ్ర స్కాలర్‌షిప్ & ఫెలోషిప్ పోర్టల్',
    mr: 'एकीकृत शिष्यवृत्ती आणि फेलोशिप व्यवस्थापन प्रणाली',
    ta: 'ஒருங்கிணைந்த உதவித்தொகை மற்றும் ஆய்வு உதவி மேலாண்மை',
    gu: 'સંકલિત શિષ્યવૃત્તિ અને ફેલોશિપ વ્યવસ્થાપન પોર્ટલ',
    sat: 'ᱥᱮᱞᱮᱫ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱟᱨ ᱯᱷᱮᱞᱳᱥᱤᱯ ᱯᱚᱨᱴᱟᱞ',
    or: 'ସମନ୍ୱିତ ବୃତ୍ତି ଓ ଫେଲୋସିପ୍ ପରିଚାଳନା ପୋର୍ଟାଲ',
    pa: 'ਯੂਨੀਫਾਈਡ ਸਕਾਲਰਸ਼ਿਪ ਅਤੇ ਫੈਲੋਸ਼ਿਪ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ'
  },
  aiActive: {
    hi: 'MoTA ऑप्टिकल एआई सक्रिय',
    en: 'MoTA Optical AI Active',
    bn: 'MoTA অপটিক্যাল এআই সক্রিয়',
    te: 'MoTA ఆప్టికల్ AI యాక్టివ్',
    mr: 'MoTA ऑप्टिकल एआय सक्रिय',
    ta: 'MoTA ஆப்டிகல் AI செயலில் உள்ளது',
    gu: 'MoTA ઓપ્ટિકલ AI સક્રિય',
    sat: 'MoTA ᱚᱯᱴᱤᱠᱟᱞ AI ᱪᱟᱹᱞᱩ ᱢᱮᱱᱟᱜ-ᱟ',
    or: 'MoTA ଅପ୍ଟିକାଲ୍ AI ସକ୍ରିୟ',
    pa: 'MoTA ਆਪਟੀਕਲ AI ਕਿਰਿਆਸ਼ੀਲ ਹੈ'
  },

  // Navigation
  navDashboard: {
    hi: 'डैशबोर्ड',
    en: 'Dashboard',
    bn: 'ড্যাশবোর্ড',
    te: 'డ్యాష్‌బోర్డ్',
    mr: 'डॅशबोर्ड',
    ta: 'முகப்பு பலகை',
    gu: 'ડેશબોર્ડ',
    sat: 'ᱰᱮᱥᱵᱳᱨᱰ',
    or: 'ଡ୍ୟାସବୋର୍ଡ',
    pa: 'ਡੈਸ਼ਬੋਰਡ'
  },
  navApply: {
    hi: 'छात्रवृत्ति आवेदन',
    en: 'Apply Fellowship',
    bn: 'ফেলোশিপ আবেদন',
    te: 'ఫెలోషిప్ దరఖాస్తు',
    mr: 'फेलोशिप अर्ज',
    ta: 'உதவித்தொகை விண்ணப்பம்',
    gu: 'ફેલોશિપ અરજી',
    sat: 'ᱯᱷᱮᱞᱳᱥᱤᱯ ᱫᱚᱨᱠᱷᱟᱥᱛ',
    or: 'ଫେଲୋସିପ୍ ଆବେଦନ',
    pa: 'ਫੈਲੋਸ਼ਿਪ ਅਰਜ਼ੀ'
  },
  navDeficiencies: {
    hi: 'दस्तावेज़ कमियां',
    en: 'Deficiencies',
    bn: 'নথির ত্রুটি',
    te: 'లోపాలు',
    mr: 'त्रुटी निराकरण',
    ta: 'ஆவண குறைபாடுகள்',
    gu: 'દસ્તાવેજ ખામીઓ',
    sat: 'ᱠᱟᱜᱚᱡᱽ ᱠᱷᱟᱹᱢᱛᱤ',
    or: 'ଦସ୍ତାବିଜ୍ ତ୍ରୁଟି',
    pa: 'ਦਸਤਾਵੇਜ਼ੀ ਕਮੀਆਂ'
  },
  navApplications: {
    hi: 'आवेदन सूची',
    en: 'Applications',
    bn: 'আবেদন তালিকা',
    te: 'దరఖాస్తులు',
    mr: 'अर्ज यादी',
    ta: 'விண்ணப்பங்கள்',
    gu: 'અરજીઓ',
    sat: 'ᱫᱚᱨᱠᱷᱟᱥᱛ ᱞᱤᱥᱴ',
    or: 'ଆବେଦନ ତାଲିକା',
    pa: 'ਅਰਜ਼ੀਆਂ'
  },
  navScrutiny: {
    hi: 'स्क्रूटनी डेस्क',
    en: 'Scrutiny Desk',
    bn: 'স্ক্রুটিনি ডেস্ক',
    te: 'పరిశీలన డెస్క్',
    mr: 'तपासणी डेस्क',
    ta: 'ஆய்வுப் பிரிவு',
    gu: 'તપાસ ડેસ્ક',
    sat: 'ᱯᱟᱨᱠᱷᱟᱣ ᱰᱮᱥᱠ',
    or: 'ଯାଞ୍ଚ ଡେସ୍କ',
    pa: 'ਜਾਂਚ ਡੈਸਕ'
  },
  navAnalytics: {
    hi: 'विश्लेषण व बजट',
    en: 'Analytics',
    bn: 'অ্যানালিটিক্স',
    te: 'విశ్లేషణలు',
    mr: 'अॅनालिटिक्स',
    ta: 'புள்ளிவிவரங்கள்',
    gu: 'વિશ્લેષણ',
    sat: 'ᱞᱮᱠᱷᱟ ᱡᱚᱠᱷᱟ',
    or: 'ବିଶ୍ଳେଷଣ',
    pa: 'ਵਿਸ਼ਲੇਸ਼ਣ'
  },
  navRules: {
    hi: 'पात्रता नियम',
    en: 'Rule Config',
    bn: 'নিয়মাবলি',
    te: 'నియమాలు',
    mr: 'नियम रचना',
    ta: 'விதிகள் அமைப்பு',
    gu: 'નિયમો',
    sat: 'ᱱᱤᱭᱚᱢ ᱠᱚ',
    or: 'ନିୟମାବଳୀ',
    pa: 'ਨਿਯਮ'
  },
  navMerit: {
    hi: 'मेरिट सूची',
    en: 'Merit List',
    bn: 'মেধা তালিকা',
    te: 'మెరిట్ జాబితా',
    mr: 'गुणवत्ता यादी',
    ta: 'தகுதிப் பட்டியல்',
    gu: 'મેરિટ યાદી',
    sat: 'ᱢᱮᱨᱤᱴ ᱛᱟᱹᱞᱠᱟᱹ',
    or: 'ମେରିଟ୍ ତାଲିକା',
    pa: 'ਮੈਰਿਟ ਸੂਚੀ'
  },

  // Student Dashboard Page
  verifiedScholar: {
    hi: 'सत्यापित एसटी शोधार्थी',
    en: 'Verified ST Scholar',
    bn: 'যাচাইকৃত এসটি গবেষক',
    te: 'ధృవీకరించబడిన ఎస్టీ పరిశోధకుడు',
    mr: 'सत्यापित एसटी संशोधक',
    ta: 'சரிபார்க்கப்பட்ட ST ஆராய்ச்சியாளர்',
    gu: 'ચકાસાયેલ ST સ્કોલર',
    sat: 'ᱥᱟᱹᱵᱩᱛ ᱟᱠᱟᱱ ST ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
    or: 'ଯାଞ୍ଚ ହୋଇଥିବା ST ଗବେଷକ',
    pa: 'ਪ੍ਰਮਾਣਿਤ ST ਖੋਜੀ'
  },
  recognizedTribe: {
    hi: 'मान्यता प्राप्त जनजाति',
    en: 'Recognized Tribe',
    bn: 'স্বীকৃত উপজাতি',
    te: 'గుర్తింపు పొందిన తెగ',
    mr: 'मान्यताप्राप्त जमात',
    ta: 'அங்கீகரிக்கப்பட்ட பழங்குடி',
    gu: 'માન્યતા પ્રાપ્ત જનજાતિ',
    sat: 'ᱩᱯᱨᱩᱢ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ',
    or: 'ସ୍ୱୀକୃତିପ୍ରାପ୍ତ ଜନଜାତି',
    pa: 'ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਕਬੀਲਾ'
  },
  stateDomicile: {
    hi: 'मूल निवास राज्य',
    en: 'State Domicile',
    bn: 'স্থায়ী রাজ্য',
    te: 'రాష్ట్ర నివాసం',
    mr: 'अधिवास राज्य',
    ta: 'சொந்த மாநிலம்',
    gu: 'મૂળ રાજ્ય',
    sat: 'ᱜᱤᱨᱟᱹᱵᱟᱹᱥᱤ ᱯᱚᱱᱚᱛ',
    or: 'ମୂଳ ରାଜ୍ୟ',
    pa: 'ਰਿਹਾਇਸ਼ੀ ਰਾਜ'
  },
  applyNewScheme: {
    hi: 'नई योजना हेतु आवेदन करें',
    en: 'Apply for New Scheme',
    bn: 'নতুন স্কিমে আবেদন করুন',
    te: 'కొత్త పథకానికి దరఖాస్తు చేయండి',
    mr: 'नवीन योजनेसाठी अर्ज करा',
    ta: 'புதிய திட்டத்திற்கு விண்ணப்பிக்கவும்',
    gu: 'નવી યોજના માટે અરજી કરો',
    sat: 'ᱱᱟᱣᱟ ᱡᱚᱡᱚᱱᱟ ᱞᱟᱹᱜᱤᱫ ᱫᱚᱨᱠᱷᱟᱥᱛ',
    or: 'ନୂତନ ଯୋଜନା ପାଇଁ ଆବେଦନ',
    pa: 'ਨਵੀਂ ਸਕੀਮ ਲਈ ਅਰਜ਼ੀ ਦਿਓ'
  },
  monthlyStipend: {
    hi: 'मासिक जेआरएफ स्टाइपेंड',
    en: 'Monthly JRF Stipend',
    bn: 'মাসিক জেআরএফ স্টাইপেন্ড',
    te: 'నెలవారీ JRF స్టైపెండ్',
    mr: 'मासिक JRF स्टायपेंड',
    ta: 'மாதாந்திர JRF உதவித்தொகை',
    gu: 'માસિક JRF સ્ટાઇપેન્ડ',
    sat: 'ᱪᱟᱸᱫᱚᱠᱤᱭᱟᱹ JRF ᱥᱴᱟᱭᱯᱮᱱᱰ',
    or: 'ମାସିକ JRF ଷ୍ଟାଇପେଣ୍ଡ',
    pa: 'ਮਹੀਨਾਵਾਰ JRF ਵਜ਼ੀਫ਼ਾ'
  },
  annualContingency: {
    hi: 'वार्षिक आकस्मिकता अनुदान',
    en: 'Annual Contingency Grant',
    bn: 'বার্ষিক কন্টিনজেন্সি অনুদান',
    te: 'వార్షిక ఆకస్మిక గ్రాంట్',
    mr: 'वार्षिक आकस्मिक निधी',
    ta: 'ஆண்டு தற்செயல் மானியம்',
    gu: 'વાર્ષિક આકસ્મિક અનુદાન',
    sat: 'ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱜᱚᱲᱚ ᱠᱟᱹᱣᱰᱤ',
    or: 'ବାର୍ଷିକ ଅନୁଦାନ',
    pa: 'ਸਾਲਾਨਾ ਅਚਨਚੇਤੀ ਗ੍ਰਾਂਟ'
  },
  researchInstitution: {
    hi: 'शोध संस्थान',
    en: 'Research Institution',
    bn: 'গবেষণা প্রতিষ্ঠান',
    te: 'పరిశోధనా సంస్థ',
    mr: 'संशोधन संस्था',
    ta: 'ஆராய்ச்சி நிறுவனம்',
    gu: 'સંશોધન સંસ્થા',
    sat: 'ᱯᱟᱲᱦᱟᱣ ᱟᱥᱲᱟ',
    or: 'ଗବେଷଣା ଅନୁଷ୍ଠାନ',
    pa: 'ਖੋਜ ਸੰਸਥਾ'
  },

  // Deficiency Alert Banner (The one in user's screenshot!)
  deficiencyActionTitle: {
    hi: 'तत्काल कार्रवाई अपेक्षित: स्क्रूटनी डेस्क द्वारा दस्तावेज़ में कमी चिह्नित',
    en: 'Action Required: Document Deficiency Flagged by Scrutiny Desk',
    bn: 'জরুরি পদক্ষেপ প্রয়োজন: স্ক্রুটিনি ডেস্ক দ্বারা নথির ত্রুটি চিহ্নিত',
    te: 'తక్షణ చర్య అవసరం: స్క్రూటినీ డెస్క్ ద్వారా పత్ర లోపం గుర్తించబడింది',
    mr: 'त्वरित कारवाई आवश्यक: छाननी कक्षाद्वारे कागदपत्रातील त्रुटी चिन्हांकित',
    ta: 'உடனடி நடவடிக்கை தேவை: ஆய்வுப் பிரிவால் ஆவணக் குறைபாடு சுட்டிக்காட்டப்பட்டுள்ளது',
    gu: 'ત્વરિત પગલાં જરૂરી: ચકાસણી ડેસ્ક દ્વારા દસ્તાવેજ ખામી ચિહ્નિત',
    sat: 'ᱞᱚᱜᱚᱱ ᱠᱟᱹᱢᱤ ᱞᱟᱹᱠᱛᱤ: ᱯᱟᱨᱠᱷᱟᱣ ᱰᱮᱥᱠ ᱦᱚᱛᱮᱛᱮ ᱠᱟᱜᱚᱡᱽ ᱠᱷᱟᱹᱢᱛᱤ ᱧᱟᱢ ᱟᱠᱟᱱᱟ',
    or: 'ତୁରନ୍ତ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ଆବଶ୍ୟକ: ଯାଞ୍ଚ ଡେସ୍କ ଦ୍ୱାରା ଦଲିଲ ତ୍ରୁଟି ଚିହ୍ନଟ',
    pa: 'ਲੋੜੀਂਦੀ ਕਾਰਵਾਈ: ਜਾਂਚ ਡੈਸਕ ਵੱਲੋਂ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਕਮੀ ਦੱਸੀ ਗਈ'
  },
  deficiencyOfficerNote: {
    hi: 'MoTA सत्यापन अधिकारी ने ऑप्टिकल दस्तावेज़ सत्यापन के दौरान त्रुटि दर्ज की:',
    en: 'The MoTA Scrutiny Officer flagged an issue during Optical Document Verification:',
    bn: 'MoTA যাচাইকরণ কর্মকর্তা অপটিক্যাল ডকুমেন্ট যাচাইয়ের সময় সমস্যা পেয়েছেন:',
    te: 'MoTA పరిశీలన అధికారి పత్రాల తనిఖీ సమయంలో లోపాన్ని నమోదు చేశారు:',
    mr: 'MoTA छाननी अधिकाऱ्यांनी ऑप्टिकल तपासणीदरम्यान त्रुटी नोंदवली आहे:',
    ta: 'MoTA ஆய்வு அதிகாரி ஆவண சரிபார்ப்பின் போது ஒரு சிக்கலைக் குறிப்பிட்டுள்ளார்:',
    gu: 'MoTA ચકાસણી અધિકારીએ દસ્તાવેજ તપાસ દરમિયાન ખામી નોંધી છે:',
    sat: 'MoTA ᱯᱟᱨᱠᱷᱟᱣᱤᱭᱟᱹ ᱠᱟᱜᱚᱡᱽ ᱧᱮᱞ ᱡᱚᱠᱷᱮᱡ ᱠᱷᱟᱹᱢᱛᱤ ᱮ ᱧᱟᱢ ᱠᱮᱫ-ᱟ:',
    or: 'MoTA ଯାଞ୍ଚ ଅଧିକାରୀ ଦଲିଲ ଯାଞ୍ଚ ସମୟରେ ତ୍ରୁଟି ଦର୍ଶାଇଛନ୍ତି:',
    pa: 'MoTA ਜਾਂਚ ਅਧਿਕਾਰੀ ਨੇ ਦਸਤਾਵੇਜ਼ ਜਾਂਚ ਦੌਰਾਨ ਨੁਕਸ ਦੱਸਿਆ:'
  },
  deficiencyReasonText: {
    hi: '"आय प्रमाण-पत्र 1 वर्ष से अधिक पुराना है - चालू वित्तीय वर्ष 2026-27 का वैध PDF पुनः अपलोड करें।"',
    en: '"Income certificate older than 1 year - Re-upload valid PDF for current Financial Year 2026-27."',
    bn: '"আয় শংসাপত্র ১ বছরের বেশি পুরনো - চলতি আর্থিক বছর ২০২৬-২৭ এর বৈধ পিডিএফ পুনরায় আপলোড করুন।"',
    te: '"ఆదాయ ధృవీకరణ పత్రం 1 సంవత్సరం కంటే పాతది - ప్రస్తుత ఆర్థిక సంవత్సరం 2026-27 కోసం చెల్లుబాటు అయ్యే PDFని మళ్లీ అప్‌లోడ్ చేయండి."',
    mr: '"उत्पन्न प्रमाणपत्र १ वर्षापेक्षा जुने आहे - चालू आर्थिक वर्ष २०२६-२७ चे वैध PDF पुन्हा अपलोड करा."',
    ta: '"வருமானச் சான்றிதழ் 1 வருடத்திற்கு மேல் பழமையானது - நடப்பு நிதியாண்டு 2026-27க்கான சரியான PDFஐ மீண்டும் பதிவேற்றவும்."',
    gu: '"આવકનું પ્રમાણપત્ર ૧ વર્ષથી વધુ જૂનું છે - વર્તમાન નાણાકીય વર્ષ ૨૦૨૬-૨૭ માટે માન્ય PDF ફરીથી અપલોડ કરો."',
    sat: '"ᱟᱨᱡᱟᱣ ᱥᱟᱹᱠᱷᱤ ᱑ ᱥᱮᱨᱢᱟ ᱠᱷᱚᱱ ᱢᱟᱨᱮ ᱜᱮᱭᱟ - ᱱᱟᱦᱟᱜ ᱠᱟᱹᱣᱰᱤ ᱥᱮᱨᱢᱟ 2026-27 ᱨᱮᱭᱟᱜ PDF ᱟᱨᱦᱚᱸ ᱟᱯᱞᱳᱰ ᱢᱮ।"',
    or: '"ଆୟ ପ୍ରମାଣପତ୍ର ୧ ବର୍ଷରୁ ଅଧିକ ପୁରୁଣା - ଚଳିତ ଆର୍ଥିକ ବର୍ଷ ୨୦୨୬-୨୭ ପାଇଁ ବୈଧ PDF ପୁନର୍ବାର ଅପଲୋଡ୍ କରନ୍ତୁ।"',
    pa: '"ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ 1 ਸਾਲ ਤੋਂ ਪੁਰਾਣਾ ਹੈ - ਮੌਜੂਦਾ ਵਿੱਤੀ ਸਾਲ 2026-27 ਲਈ ਵੈਧ PDF ਦੁਬਾਰਾ ਅਪਲੋਡ ਕਰੋ।"'
  },
  deficiencyDeadlineNote: {
    hi: 'सत्यापन पुनः शुरू करने हेतु संशोधित प्रमाण-पत्र अपलोड करें। कोई जुर्माना नहीं है।',
    en: 'Please submit the rectified certificate to resume verification. No penalty applied.',
    bn: 'যাচাইকরণ পুনরায় শুরু করতে সংশোধিত শংসাপত্র জমা দিন। কোনো জরিমানা প্রযোজ্য নয়।',
    te: 'పరిశీలనను తిరిగి ప్రారంభించడానికి సరిదిద్దబడిన పత్రాన్ని సమర్పించండి. ఎలాంటి జరిమానా లేదు.',
    mr: 'सत्यापन पुन्हा सुरू करण्यासाठी दुरुस्त केलेले प्रमाणपत्र सबमिट करा. कोणताही दंड आकारला जात नाही.',
    ta: 'சரிபார்ப்பை மீண்டும் தொடங்க திருத்தப்பட்ட சான்றிதழைச் சமர்ப்பிக்கவும். அபராதம் இல்லை.',
    gu: 'ચકાસણી ફરી શરૂ કરવા માટે સુધારેલું પ્રમાણપત્ર સબમિટ કરો. કોઈ દંડ નથી.',
    sat: 'ᱯᱟᱨᱠᱷᱟᱣ ᱮᱦᱚᱵ ᱨᱩᱣᱟᱹᱲ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱤᱠ ᱠᱟᱜᱚᱡᱽ ᱮᱢ ᱢᱮ᱾ ᱡᱟᱦᱟᱸᱱ ᱫᱟᱹᱱᱰ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾',
    or: 'ଯାଞ୍ଚ ପୁନର୍ବାର ଆରମ୍ଭ କରିବାକୁ ସଂଶୋଧିତ ପ୍ରମାଣପତ୍ର ଦାଖଲ କରନ୍ତୁ। କୌଣସି ଜରିମାନା ନାହିଁ।',
    pa: 'ਜਾਂਚ ਮੁੜ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸੋਧਿਆ ਸਰਟੀਫਿਕੇਟ ਜਮ੍ਹਾਂ ਕਰੋ। ਕੋਈ ਜੁਰਮਾਨਾ ਨਹੀਂ ਹੈ।'
  },
  resolveButtonText: {
    hi: 'अभी समाधान करें और पुनः अपलोड करें',
    en: 'Resolve & Re-Upload Now',
    bn: 'এখনই সমাধান ও পুনরায় আপলোড করুন',
    te: 'ఇప్పుడే పరిష్కరించి మళ్లీ అప్‌లోడ్ చేయండి',
    mr: 'आता दुरुस्ती करा आणि पुन्हा अपलोड करा',
    ta: 'இப்போதே சரிசெய்து பதிவேற்றவும்',
    gu: 'હમણાં ઉકેલો અને ફરીથી અપલોડ કરો',
    sat: 'ᱱᱤᱛ ᱜᱮ ᱴᱷᱤᱠ ᱢᱮ ᱟᱨ ᱟᱯᱞᱳᱰ ᱢᱮ',
    or: 'ବର୍ତ୍ତମାନ ସମାଧାନ କରନ୍ତୁ ଏବଂ ପୁନଃ ଅପଲୋଡ୍ କରନ୍ତୁ',
    pa: 'ਹੁਣੇ ਹੱਲ ਕਰੋ ਅਤੇ ਮੁੜ ਅਪਲੋਡ ਕਰੋ'
  },

  // 5 Stages in Status Stepper
  stageSubmitted: {
    hi: 'आवेदन जमा',
    en: 'Submitted',
    bn: 'জমা হয়েছে',
    te: 'సమర్పించబడింది',
    mr: 'अर्ज सादर',
    ta: 'சமர்ப்பிக்கப்பட்டது',
    gu: 'અરજી સબમિટ',
    sat: 'ᱫᱟᱠᱷᱤᱞ ᱮᱱᱟ',
    or: 'ଦାଖଲ ହୋଇଛି',
    pa: 'ਜਮ੍ਹਾਂ ਕਰਵਾਈ ਗਈ'
  },
  stageOcr: {
    hi: 'एआई ओसीआर सत्यापित',
    en: 'OCR Verified',
    bn: 'এআই ওসিআর যাচাইকৃত',
    te: 'AI OCR ధృవీకరించబడింది',
    mr: 'एआय ओसीआर तपासणी',
    ta: 'AI OCR சரிபார்க்கப்பட்டது',
    gu: 'AI OCR ચકાસાયેલ',
    sat: 'AI OCR ᱥᱟᱹᱵᱩᱛ',
    or: 'AI OCR ଯାଞ୍ଚ ହୋଇଛି',
    pa: 'AI OCR ਪ੍ਰਮਾਣਿਤ'
  },
  stageScrutiny: {
    hi: 'अधिकारी स्क्रूटनी',
    en: 'Scrutiny',
    bn: 'অফিসার স্ক্রুটিনি',
    te: 'స్క్రూటినీ',
    mr: 'अधिकारी छाननी',
    ta: 'அதிகாரி ஆய்வு',
    gu: 'અધિકારી તપાસ',
    sat: 'ᱯᱟᱨᱠᱷᱟᱣ',
    or: 'ଅଧିକାରୀ ଯାଞ୍ଚ',
    pa: 'ਅਧਿਕਾਰੀ ਜਾਂਚ'
  },
  stageSelection: {
    hi: 'मेरिट चयन',
    en: 'Selection',
    bn: 'মেধা নির্বাচন',
    te: 'ఎంపిక',
    mr: 'गुणवत्ता निवड',
    ta: 'தேர்வு',
    gu: 'મેરિટ પસંદગી',
    sat: 'ᱵᱟᱪᱷᱟᱣ',
    or: 'ଚୟନ',
    pa: 'ਚੋਣ'
  },
  stageSanctioned: {
    hi: 'स्वीकृत एवं संवितरित',
    en: 'Sanctioned',
    bn: 'অনুমোদিত ও প্রেরিত',
    te: 'మంజూరైంది',
    mr: 'मंजूर व वितरित',
    ta: 'அங்கீகரிக்கப்பட்டது',
    gu: 'મંજૂર અને ચૂકવેલ',
    sat: 'ᱯᱟᱥ ᱮᱱᱟ',
    or: 'ମଞ୍ଜୁର ହୋଇଛି',
    pa: 'ਮਨਜ਼ੂਰ ਸ਼ੁਦਾ'
  },

  // PFMS Direct Benefit Transfer
  dbtTrackerTitle: {
    hi: 'प्रत्यक्ष लाभ अंतरण (PFMS DBT ट्रैकर)',
    en: 'Direct Benefit Transfer (PFMS DBT Tracker)',
    bn: 'সরাসরি সুবিধা হস্তান্তর (PFMS DBT ট্র্যাকার)',
    te: 'డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్ (PFMS DBT)',
    mr: 'थेट लाभ हस्तांतरण (PFMS DBT ट्रॅकर)',
    ta: 'நேரடி பலன் பரிமாற்றம் (PFMS DBT டிராக்கர்)',
    gu: 'ડાયરેક્ટ બેનિફિટ ટ્રાન્સફર (PFMS DBT ટ્રેકર)',
    sat: 'ᱥᱚᱡᱷᱮ ᱵᱮᱸᱠ ᱴᱨᱟᱱᱥᱯᱷᱟᱨ (PFMS DBT)',
    or: 'ପ୍ରତ୍ୟକ୍ଷ ଲାଭ ହସ୍ତାନ୍ତରଣ (PFMS DBT)',
    pa: 'ਸਿੱਧਾ ਲਾਭ ਤਬਾਦਲਾ (PFMS DBT)'
  },
  aadhaarLinkedBank: {
    hi: 'आधार-लिंक्ड बैंक खाता',
    en: 'Aadhaar-Linked Bank Account',
    bn: 'আধার-সংযুক্ত ব্যাংক অ্যাকাউন্ট',
    te: 'ఆధార్ అనుసంధానిత బ్యాంకు ఖాతా',
    mr: 'आधार-संलग्न बँक खाते',
    ta: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு',
    gu: 'આધાર-લિંક્ડ બેંક ખાતું',
    sat: 'ᱟᱫᱷᱟᱨ ᱡᱚᱲᱟᱣ ᱵᱮᱸᱠ ᱠᱷᱟᱛᱟ',
    or: 'ଆଧାର-ସଂଯୁକ୍ତ ବ୍ୟାଙ୍କ ଖାତା',
    pa: 'ਆਧਾਰ ਲਿੰਕਡ ਬੈਂਕ ਖਾਤਾ'
  },
  dbtStatusDisbursed: {
    hi: 'संवितरित (PFMS Disbursed)',
    en: 'Disbursed (PFMS Active)',
    bn: 'প্রেরিত হয়েছে (Disbursed)',
    te: 'పంపిణీ చేయబడింది',
    mr: 'वितरित झाले (Disbursed)',
    ta: 'வழங்கப்பட்டது',
    gu: 'ચૂકવાઈ ગયું',
    sat: 'ᱠᱟᱹᱣᱰᱤ ᱪᱟᱞᱟᱣ ᱮᱱᱟ',
    or: 'ପ୍ରଦାନ କରାଯାଇଛି',
    pa: 'ਵੰਡਿਆ ਗਿਆ'
  },

  // Homepage Elements
  homeHeroTitle: {
    hi: 'राष्ट्रीय जनजातीय उच्च शिक्षा फैलोशिप पोर्टल',
    en: 'National Tribal Higher Education Fellowship Portal',
    bn: 'জাতীয় উপজাতীয় উচ্চশিক্ষা ফেলোশিপ পোর্টাল',
    te: 'నేషనల్ ట్రైబల్ ఉన్నత విద్యా ఫెలోషిప్ పోర్టల్',
    mr: 'राष्ट्रीय आदिवासी उच्च शिक्षण फेलोशिप पोर्टल',
    ta: 'தேசிய பழங்குடியினர் உயர்கல்வி உதவித்தொகை தளம்',
    gu: 'રાષ્ટ્રીય જનજાતિ ઉચ્ચ શિક્ષણ ફેલોશિપ પોર્ટલ',
    sat: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱴᱨᱟᱭᱵᱟᱞ ᱪᱮᱛᱟᱱ ᱥᱮᱪᱮᱫ ᱯᱷᱮᱞᱳᱥᱤᱯ ᱯᱚᱨᱴᱟᱞ',
    or: 'ଜାତୀୟ ଜନଜାତି ଉଚ୍ଚଶିକ୍ଷା ଫେଲୋସିପ୍ ପୋର୍ଟାଲ',
    pa: 'ਰਾਸ਼ਟਰੀ ਕਬਾਇਲੀ ਉੱਚ ਸਿੱਖਿਆ ਫੈਲੋਸ਼ਿਪ ਪੋਰਟਲ'
  },
  homeHeroSubtitle: {
    hi: 'जनजातीय कार्य मंत्रालय द्वारा अनुसूचित जनजाति (ST) के मेधावी छात्रों हेतु भारत और विदेश में Ph.D. एवं मास्टर डिग्री के लिए पूर्ण वित्तीय सहायता।',
    en: 'Comprehensive financial support for Scheduled Tribe (ST) scholars pursuing Ph.D. and Master\'s degrees across premier Indian institutes and top 500 QS world universities.',
    bn: 'তপশিলি উপজাতি শিক্ষার্থীদের জন্য ভারত ও বিদেশের শীর্ষ বিশ্ববিদ্যালয়ে পিএইচডি এবং মাস্টার্স করার জন্য উপজাতি বিষয়ক মন্ত্রকের পূর্ণ আর্থিক সহায়তা।',
    te: 'భారతదేశం మరియు విదేశాలలో Ph.D. మరియు మాస్టర్స్ చదవడానికి ఎస్టీ విద్యార్థులకు MoTA పూర్తి ఆర్థిక సహాయం.',
    mr: 'आदिवासी कार्य मंत्रालयामार्फत एसटी विद्यार्थ्यांसाठी भारतात व परदेशात Ph.D. व पदव्युत्तर शिक्षणासाठी पूर्ण आर्थिक मदत.',
    ta: 'இந்திய மற்றும் வெளிநாட்டு பல்கலைக்கழகங்களில் Ph.D. மற்றும் முதுகலை படிக்கும் ST மாணவர்களுக்கு MoTA வழங்கும் முழு நிதியுதவி.',
    gu: 'ભારત અને વિદેશમાં Ph.D. કરવા માટે ST વિદ્યાર્થીઓને ૧૦૦% સરકારી નાણાકીય સહાય.',
    sat: 'ᱵᱷᱟᱨᱚᱛ ᱟᱨ ᱵᱤᱫᱮᱥ ᱨᱮ Ph.D. ᱯᱟᱲᱦᱟᱣ ᱞᱟᱹᱜᱤᱫ ST ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ MoTA ᱯᱩᱨᱟᱹ ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚᱭ ᱮᱢᱚᱜ-ᱟ᱾',
    or: 'ଭାରତ ଓ ବିଦେଶରେ Ph.D. ପାଇଁ ST ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସମ୍ପୂର୍ଣ୍ଣ ଆର୍ଥିକ ଅନୁଦାନ।',
    pa: 'ਭਾਰਤ ਅਤੇ ਵਿਦੇਸ਼ਾਂ ਵਿੱਚ Ph.D. ਕਰਨ ਲਈ ST ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਪੂਰੀ ਵਿੱਤੀ ਸਹਾਇਤਾ।'
  },
  chooseRoleTitle: {
    hi: 'अपनी भूमिका चुनें (Select Service)',
    en: 'Select Your Service Portal',
    bn: 'আপনার ভূমিকা বা সেবা নির্বাচন করুন',
    te: 'మీ సేవను ఎంచుకోండి',
    mr: 'तुमची भूमिका निवडा',
    ta: 'உங்கள் சேவையைத் தேர்ந்தெடுக்கவும்',
    gu: 'તમારી સેવા પસંદ કરો',
    sat: 'ᱟᱢᱟᱜ ᱠᱟᱹᱢᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    or: 'ଆପଣଙ୍କର ସେବା ଚୟନ କରନ୍ତୁ',
    pa: 'ਆਪਣੀ ਸੇਵਾ ਚੁਣੋ'
  },
  roleStudentTitle: {
    hi: 'छात्र पोर्टल (ST Scholar)',
    en: 'ST Scholar Portal',
    bn: 'শিক্ষার্থী পোর্টাল',
    te: 'విద్యార్థి పోర్టల్',
    mr: 'विद्यार्थी पोर्टल',
    ta: 'மாணவர் தளம்',
    gu: 'વિદ્યાર્થી પોર્ટલ',
    sat: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱯᱚᱨᱴᱟᱞ',
    or: 'ଛାତ୍ର ପୋର୍ଟାଲ',
    pa: 'ਵਿਦਿਆਰਥੀ ਪੋਰਟਲ'
  },
  roleOfficerTitle: {
    hi: 'सत्यापन अधिकारी (Scrutiny Officer)',
    en: 'Desk Scrutiny Officer',
    bn: 'যাচাইকরণ কর্মকর্তা',
    te: 'పరిశీలన అధికారి',
    mr: 'तपासणी अधिकारी',
    ta: 'சரிபார்ப்பு அதிகாரி',
    gu: 'ચકાસણી અધિકારી',
    sat: 'ᱯᱟᱨᱠᱷᱟᱣᱤᱭᱟᱹ ᱚᱯᱷᱤᱥᱟᱨ',
    or: 'ଯାଞ୍ଚ ଅଧିକାରୀ',
    pa: 'ਜਾਂਚ ਅਧਿਕਾਰੀ'
  },
  roleAdminTitle: {
    hi: 'सचिवालय व्यवस्थापक (MoTA Admin)',
    en: 'MoTA Secretariat Admin',
    bn: 'মন্ত্রণালয় প্রশাসক',
    te: 'మంత్రిత్వ శాఖ అడ్మిన్',
    mr: 'मंत्रालय प्रशासक',
    ta: 'அமைச்சக நிர்வாகி',
    gu: 'મંત્રાલય એડમિન',
    sat: 'ᱢᱚᱱᱛᱨᱟᱞᱚᱭ ᱮᱰᱢᱤᱱ',
    or: 'ମନ୍ତ୍ରଣାଳୟ ପ୍ରଶାସକ',
    pa: 'ਮੰਤਰਾਲਾ ਪ੍ਰਬੰਧਕ'
  },
  loginCta: {
    hi: 'प्रवेश करें (Login)',
    en: 'Enter Portal (Login)',
    bn: 'প্রবেশ করুন (Login)',
    te: 'ప్రవేశించండి (Login)',
    mr: 'प्रवेश करा (Login)',
    ta: 'உள்நுழைக (Login)',
    gu: 'પ્રવેશ કરો (Login)',
    sat: 'ᱵᱚᱞᱚᱱ ᱢᱮ (Login)',
    or: 'ପ୍ରବେଶ କରନ୍ତୁ (Login)',
    pa: 'ਦਾਖਲ ਹੋਵੋ (Login)'
  },
  changeLanguage: {
    hi: 'भाषा चुनें',
    en: 'Change Language',
    bn: 'ভাষা পরিবর্তন',
    te: 'భాషను మార్చండి',
    mr: 'भाषा बदला',
    ta: 'மொழியை மாற்று',
    gu: 'ભાષા બદલો',
    sat: 'ᱯᱟᱹᱨᱥᱤ ᱵᱚᱫᱚᱞ',
    or: 'ଭାଷା ପରିବର୍ତ୍ତନ',
    pa: 'ਭਾਸ਼ਾ ਬਦਲੋ'
  }
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  setLanguageByCode: (code: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(ALL_INDIAN_LANGUAGES[0]); // Default: Hindi

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tribalsetu_language_code');
      if (saved) {
        const found = ALL_INDIAN_LANGUAGES.find((l) => l.code === saved);
        if (found) {
          setLanguageState(found);
        }
      }
    } catch (e) {
      console.warn('Could not read saved language', e);
    }
  }, []);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('tribalsetu_language_code', newLang.code);
    } catch (e) {
      console.warn('Could not save language', e);
    }
  };

  const setLanguageByCode = (code: string) => {
    const found = ALL_INDIAN_LANGUAGES.find((l) => l.code === code);
    if (found) {
      setLanguage(found);
    }
  };

  // Translation helper function
  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;

    // Try selected language
    if (entry[language.code]) {
      return entry[language.code];
    }

    // Fallback to Hindi or English
    return entry['hi'] || entry['en'] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        setLanguageByCode,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
