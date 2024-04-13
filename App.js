import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import * as Speech from "expo-speech";
import { Picker } from "@react-native-picker/picker";
import Slider from "react-native-slider-harmony";
import { FontAwesome } from "@expo/vector-icons";

const voiceNames = {
  "fr-fr-x-frc-local": "French (France)",
  "pl-pl-x-oda-local": "Polish (Poland)",
  "nl-be-x-bec-local": "Dutch (Belgium)",
  "pt-pt-x-pmj-local": "Portuguese (Portugal)",
  "ur-pk-x-cfn-local": "Urdu (Pakistan)",
  "fr-ca-x-cad-local": "French (Canada)",
  "en-us-x-tpf-local": "English (United States)",
  "de-de-x-deb-network": "German (Germany)",
  "sv-se-x-afp-network": "Swedish (Sweden)",
  "es-us-x-sfb-network": "Spanish (United States)",
  "en-au-x-aub-network": "English (Australia)",
  "yue-hk-x-yud-local": "Cantonese (Hong Kong)",
  "en-ng-x-tfn-network": "English (Nigeria)",
  "pt-br-x-afs-network": "Portuguese (Brazil)",
  "nl-NL-language": "Dutch (Netherlands)",
  "ru-ru-x-rud-network": "Russian (Russia)",
  "nb-no-x-tfs-local": "Norwegian (Norway)",
  "da-dk-x-sfp-network": "Danish (Denmark)",
  "fr-ca-x-caa-network": "French (Canada)",
  "ru-ru-x-ruf-local": "Russian (Russia)",
  "te-in-x-tem-network": "Telugu (India)",
  "en-au-x-auc-local": "English (Australia)",
  "es-US-language": "Spanish (United States)",
  "pt-pt-x-sfs-network": "Portuguese (Portugal)",
  "en-in-x-ene-network": "English (India)",
  "en-GB-language": "English (United Kingdom)",
  "hu-hu-x-kfl-local": "Hungarian (Hungary)",
  "bn-in-x-bnf-local": "Bengali (India)",
  "es-us-x-esc-network": "Spanish (United States)",
  "ko-kr-x-koc-network": "Korean (South Korea)",
  "en-gb-x-gba-network": "English (United Kingdom)",
  "id-id-x-dfz-network": "Indonesian (Indonesia)",
  "en-au-x-aud-network": "English (Australia)",
  "cmn-cn-x-cce-local": "Mandarin (China)",
  "ml-IN-language": "Malayalam (India)",
  "en-us-x-sfg-network": "English (United States)",
  "hi-in-x-hid-network": "Hindi (India)",
  "uk-ua-x-hfd-local": "Ukrainian (Ukraine)",
  "es-es-x-eee-local": "Spanish (Spain)",
  "tr-tr-x-tmc-local": "Turkish (Turkey)",
  "cmn-cn-x-ssa-local": "Mandarin (China)",
  "ru-ru-x-ruf-network": "Russian (Russia)",
  "pt-pt-x-sfs-local": "Portuguese (Portugal)",
  "ar-language": "Arabic",
  "et-ee-x-tms-network": "Estonian (Estonia)",
  "fr-ca-x-cac-network": "French (Canada)",
  "en-NG-language": "English (Nigeria)",
  "vi-VN-language": "Vietnamese (Vietnam)",
  "ms-my-x-msc-local": "Malay (Malaysia)",
  "bs-ba-x-bsm-local": "Bosnian (Bosnia)",
  "jv-id-x-jvf-local": "Javanese (Indonesia)",
  "en-gb-x-gbc-network": "English (United Kingdom)",
  "pt-PT-language": "Portuguese (Portugal)",
  "ar-xa-x-ard-network": "Arabic (Saudi Arabia)",
  "pt-pt-x-jfb-network": "Portuguese (Portugal)",
  "pt-br-x-pte-local": "Portuguese (Brazil)",
  "el-GR-language": "Greek (Greece)",
  "en-us-x-sfg-local": "English (United States)",
  "fil-PH-language": "Filipino (Philippines)",
  "pt-BR-language": "Portuguese (Brazil)",
  "vi-vn-x-gft-network": "Vietnamese (Vietnam)",
  "fi-FI-language": "Finnish (Finland)",
  "vi-vn-x-vie-network": "Vietnamese (Vietnam)",
  "fil-ph-x-fie-local": "Filipino (Philippines)",
  "da-DK-language": "Danish (Denmark)",
  "fil-ph-x-fid-network": "Filipino (Philippines)",
  "yue-hk-x-yue-network": "Cantonese (Hong Kong)",
  "si-lk-x-sin-local": "Sinhala (Sri Lanka)",
  "sk-sk-x-sfk-local": "Slovak (Slovakia)",
  "en-us-x-iob-local": "English (United States)",
  "bg-bg-x-ifk-local": "Bulgarian (Bulgaria)",
  "th-th-x-mol-local": "Thai (Thailand)",
  "km-KH-language": "Khmer (Cambodia)",
  "bs-ba-language": "Bosnian (Bosnia)",
  "sv-SE-language": "Swedish (Sweden)",
  "cmn-tw-x-ctd-network": "Mandarin (Taiwan)",
  "pa-in-x-pac-local": "Punjabi (India)",
  "ar-xa-x-are-local": "Arabic (Saudi Arabia)",
  "ru-RU-language": "Russian (Russia)",
  "pl-pl-x-bmg-local": "Polish (Poland)",
  "vi-vn-x-vid-local": "Vietnamese (Vietnam)",
  "pl-pl-x-oda-network": "Polish (Poland)",
  "pt-pt-x-jmn-local": "Portuguese (Portugal)",
  "ur-pk-x-urm-local": "Urdu (Pakistan)",
  "cs-cz-x-jfs-local": "Czech (Czech Republic)",
  "tr-tr-x-efu-network": "Turkish (Turkey)",
  "et-ee-x-tms-local": "Estonian (Estonia)",
  "nb-no-x-tfs-network": "Norwegian (Norway)",
  "en-in-x-enc-network": "English (India)",
  "en-gb-x-gbc-local": "English (United Kingdom)",
  "es-us-x-esd-local": "Spanish (United States)",
  "te-in-x-tef-local": "Telugu (India)",
  "nl-nl-x-bmh-network": "Dutch (Netherlands)",
  "ml-in-x-mlm-local": "Malayalam (India)",
  "sw-ke-x-swm-local": "Swahili (Kenya)",
  "tr-tr-x-mfm-local": "Turkish (Turkey)",
  "gu-in-x-gum-network": "Gujarati (India)",
  "en-in-x-enc-local": "English (India)",
  "hi-in-x-hie-local": "Hindi (India)",
  "nl-nl-x-lfc-local": "Dutch (Netherlands)",
  "ms-my-x-msg-network": "Malay (Malaysia)",
  "fi-fi-x-afi-local": "Finnish (Finland)",
  "en-us-x-tpd-network": "English (United States)",
  "id-id-x-ide-local": "Indonesian (Indonesia)",
  "pt-pt-x-pmj-network": "Portuguese (Portugal)",
  "es-es-x-eef-local": "Spanish (Spain)",
  "ko-kr-x-kod-local": "Korean (South Korea)",
  "ta-IN-language": "Tamil (India)",
  "nb-no-x-tmg-local": "Norwegian (Norway)",
  "en-us-x-tpc-network": "English (United States)",
  "es-es-x-eec-network": "Spanish (Spain)",
  "el-gr-x-vfz-local": "Greek (Greece)",
  "ur-pk-x-cfn-network": "Urdu (Pakistan)",
  "en-in-x-end-local": "English (India)",
  "nb-no-x-rfj-network": "Norwegian (Norway)",
  "es-es-x-eea-local": "Spanish (Spain)",
  "cmn-cn-x-ccd-network": "Mandarin (China)",
  "yue-hk-x-yuc-network": "Cantonese (Hong Kong)",
  "ar-xa-x-arc-local": "Arabic (Saudi Arabia)",
  "gu-in-x-guf-network": "Gujarati (India)",
  "nb-no-x-cfl-network": "Norwegian (Norway)",
  "uk-ua-x-hfd-network": "Ukrainian (Ukraine)",
  "ko-kr-x-ism-local": "Korean (South Korea)",
  "gu-IN-language": "Gujarati (India)",
  "en-in-x-ena-network": "English (India)",
  "kn-in-x-knm-local": "Kannada (India)",
  "fr-ca-x-cac-local": "French (Canada)",
  "de-DE-language": "German (Germany)",
  "zh-CN-language": "Chinese (China)",
  "it-it-x-itb-local": "Italian (Italy)",
  "ms-my-x-msg-local": "Malay (Malaysia)",
  "en-ng-x-tfn-local": "English (Nigeria)",
  "bg-bg-x-ifk-network": "Bulgarian (Bulgaria)",
  "nl-nl-x-dma-network": "Dutch (Netherlands)",
  "nb-no-x-cmj-network": "Norwegian (Norway)",
  "it-it-x-itb-network": "Italian (Italy)",
  "nl-nl-x-lfc-network": "Dutch (Netherlands)",
  "en-au-x-aub-local": "English (Australia)",
  "ru-ru-x-rue-local": "Russian (Russia)",
  "en-in-x-ahp-local": "English (India)",
  "gu-in-x-guf-local": "Gujarati (India)",
  "ms-MY-language": "Malay (Malaysia)",
  "fil-ph-x-fid-local": "Filipino (Philippines)",
  "pl-pl-x-afb-network": "Polish (Poland)",
  "fil-ph-x-fie-network": "Filipino (Philippines)",
  "yue-hk-x-yuf-local": "Cantonese (Hong Kong)",
  "ar-xa-x-ard-local": "Arabic (Saudi Arabia)",
  "vi-vn-x-vic-local": "Vietnamese (Vietnam)",
  "su-id-x-suf-network": "Sundanese (Indonesia)",
  "en-in-x-ahp-network": "English (India)",
  "id-id-x-idd-network": "Indonesian (Indonesia)",
  "pt-pt-x-jmn-network": "Portuguese (Portugal)",
  "it-it-x-itc-local": "Italian (Italy)",
  "nb-no-x-cfl-local": "Norwegian (Norway)",
  "en-gb-x-gbb-local": "English (United Kingdom)",
  "sv-se-x-dmc-network": "Swedish (Sweden)",
  "yue-HK-language": "Cantonese (Hong Kong)",
  "vi-vn-x-gft-local": "Vietnamese (Vietnam)",
  "su-ID-language": "Sundanese (Indonesia)",
  "th-TH-language": "Thai (Thailand)",
  "ur-PK-language": "Urdu (Pakistan)",
  "en-us-x-iob-network": "English (United States)",
  "en-AU-language": "English (Australia)",
  "en-us-x-iol-network": "English (United States)",
  "ja-JP-language": "Japanese (Japan)",
  "fr-FR-language": "French (France)",
  "fr-fr-x-frb-local": "French (France)",
  "ar-xa-x-arz-local": "Arabic (Saudi Arabia)",
  "id-id-x-ide-network": "Indonesian (Indonesia)",
  "bn-in-x-bnx-network": "Bengali (India)",
  "ru-ru-x-rue-network": "Russian (Russia)",
  "nb-no-x-rfj-local": "Norwegian (Norway)",
  "bn-in-x-bnm-network": "Bengali (India)",
  "pa-in-x-pag-local": "Punjabi (India)",
  "bn-BD-language": "Bengali (Bangladesh)",
  "nl-be-x-bed-network": "Dutch (Belgium)",
  "th-th-x-mol-network": "Thai (Thailand)",
  "pa-IN-language": "Punjabi (India)",
  "en-us-x-iom-network": "English (United States)",
  "ml-in-x-mlf-local": "Malayalam (India)",
  "cmn-cn-x-ccc-local": "Mandarin (China)",
  "nl-nl-x-tfb-network": "Dutch (Netherlands)",
  "lv-LV-language": "Latvian (Latvia)",
  "es-es-x-eea-network": "Spanish (Spain)",
  "tr-tr-x-tmc-network": "Turkish (Turkey)",
  "hi-in-x-hia-local": "Hindi (India)",
  "pl-pl-x-zfg-network": "Polish (Poland)",
  "cmn-cn-x-ccc-network": "Mandarin (China)",
  "ko-kr-x-kob-network": "Korean (South Korea)",
  "mr-IN-language": "Marathi (India)",
  "tr-tr-x-efu-local": "Turkish (Turkey)",
  "te-in-x-tem-local": "Telugu (India)",
  "jv-id-x-jvf-network": "Javanese (Indonesia)",
  "et-EE-language": "Estonian (Estonia)",
  "ko-KR-language": "Korean (South Korea)",
  cy: "Welsh",
  "ja-jp-x-jab-network": "Japanese (Japan)",
  hr: "Croatian",
  "te-IN-language": "Telugu (India)",
  "de-de-x-dea-network": "German (Germany)",
  "vi-vn-x-vie-local": "Vietnamese (Vietnam)",
  "nl-nl-x-bmh-local": "Dutch (Netherlands)",
  "fr-ca-x-cab-network": "French (Canada)",
  "da-dk-x-nmm-network": "Danish (Denmark)",
  "tr-tr-x-cfs-local": "Turkish (Turkey)",
  "es-us-x-esf-local": "Spanish (United States)",
  "pl-pl-x-jmk-network": "Polish (Poland)",
  "hi-in-x-hid-local": "Hindi (India)",
  "cmn-tw-x-cte-network": "Mandarin (Taiwan)",
  "en-gb-x-gbd-local": "English (United Kingdom)",
  "es-us-x-esc-local": "Spanish (United States)",
  "hi-in-x-hic-network": "Hindi (India)",
  "fr-CA-language": "French (Canada)",
  "it-IT-language": "Italian (Italy)",
  "en-gb-x-gbg-local": "English (United Kingdom)",
  "en-gb-x-rjs-local": "English (United Kingdom)",
  "sq-al-x-sqm-network": "Albanian (Albania)",
  "en-us-x-iom-local": "English (United States)",
  "en-au-x-auc-network": "English (Australia)",
  "kn-in-x-knf-local": "Kannada (India)",
  "pt-br-x-afs-local": "Portuguese (Brazil)",
  "bn-bd-x-ban-network": "Bengali (Bangladesh)",
  "fil-ph-x-fic-local": "Filipino (Philippines)",
  "ko-kr-x-kod-network": "Korean (South Korea)",
  "si-lk-x-sin-network": "Sinhala (Sri Lanka)",
  "en-in-x-end-network": "English (India)",
  "pa-in-x-pag-network": "Punjabi (India)",
  "sv-se-x-afp-local": "Swedish (Sweden)",
  "hu-HU-language": "Hungarian (Hungary)",
  "yue-hk-x-jar-local": "Cantonese (Hong Kong)",
  "tr-tr-x-ama-network": "Turkish (Turkey)",
  "bn-IN-language": "Bengali (India)",
  "yue-hk-x-yuf-network": "Cantonese (Hong Kong)",
  "da-dk-x-nmm-local": "Danish (Denmark)",
  "da-dk-x-vfb-network": "Danish (Denmark)",
  "tr-TR-language": "Turkish (Turkey)",
  "sw-ke-x-swm-network": "Swahili (Kenya)",
  "ko-kr-x-koc-local": "Korean (South Korea)",
  "kn-in-x-knm-network": "Kannada (India)",
  "en-US-language": "English (United States)",
  "hi-in-x-hia-network": "Hindi (India)",
  "da-dk-x-kfm-network": "Danish (Denmark)",
  "sq-al-language": "Albanian (Albania)",
  "cmn-tw-x-ctc-network": "Mandarin (Taiwan)",
  "su-id-x-suf-local": "Sundanese (Indonesia)",
  "uk-UA-language": "Ukrainian (Ukraine)",
  "ja-jp-x-htm-network": "Japanese (Japan)",
  "en-gb-x-gba-local": "English (United Kingdom)",
  "nl-nl-x-yfr-network": "Dutch (Netherlands)",
  "hu-hu-x-kfl-network": "Hungarian (Hungary)",
  "en-in-x-ene-local": "English (India)",
  "pa-in-x-pae-local": "Punjabi (India)",
  "ru-ru-x-ruc-network": "Russian (Russia)",
  "en-au-x-aua-network": "English (Australia)",
  "ja-jp-x-jad-network": "Japanese (Japan)",
  "nl-be-x-bec-network": "Dutch (Belgium)",
  "fr-fr-x-fra-local": "French (France)",
  "es-es-x-eed-local": "Spanish (Spain)",
  "hi-IN-language": "Hindi (India)",
  "cmn-cn-x-ccd-local": "Mandarin (China)",
  "fr-ca-x-cab-local": "French (Canada)",
  "pl-pl-x-bmg-network": "Polish (Poland)",
  "ja-jp-x-jab-local": "Japanese (Japan)",
  "da-dk-x-kfm-local": "Danish (Denmark)",
  "en-us-x-tpd-local": "English (United States)",
  "ro-ro-x-vfv-network": "Romanian (Romania)",
  "sv-se-x-lfs-local": "Swedish (Sweden)",
  "pl-pl-x-zfg-local": "Polish (Poland)",
  "es-us-x-esf-network": "Spanish (United States)",
  "pl-pl-x-jmk-local": "Polish (Poland)",
  "es-us-x-sfb-local": "Spanish (United States)",
  "es-ES-language": "Spanish (Spain)",
  "kn-IN-language": "Kannada (India)",
  "sv-se-x-lfs-network": "Swedish (Sweden)",
  "en-au-x-aua-local": "English (Australia)",
  "nl-nl-x-dma-local": "Dutch (Netherlands)",
  "cmn-cn-x-cce-network": "Mandarin (China)",
  "vi-vn-x-vif-network": "Vietnamese (Vietnam)",
  "ru-ru-x-rud-local": "Russian (Russia)",
  "en-gb-x-rjs-network": "English (United Kingdom)",
  "id-id-x-idc-network": "Indonesian (Indonesia)",
  "nl-nl-x-yfr-local": "Dutch (Netherlands)",
  "fil-ph-x-fic-network": "Filipino (Philippines)",
  "nl-be-x-bed-local": "Dutch (Belgium)",
  "fil-ph-x-cfc-network": "Filipino (Philippines)",
  "it-it-x-kda-network": "Italian (Italy)",
  "id-ID-language": "Indonesian (Indonesia)",
  "cs-cz-x-jfs-network": "Czech (Czech Republic)",
  "ml-in-x-mlm-network": "Malayalam (India)",
  "de-de-x-deg-network": "German (Germany)",
  "pa-in-x-pac-network": "Punjabi (India)",
  "ro-RO-language": "Romanian (Romania)",
  "cmn-tw-x-ctc-local": "Mandarin (Taiwan)",
  "kn-in-x-knf-network": "Kannada (India)",
  "it-it-x-itc-network": "Italian (Italy)",
  "es-es-x-eed-network": "Spanish (Spain)",
  "ms-my-x-mse-network": "Malay (Malaysia)",
  "yue-hk-x-yue-local": "Cantonese (Hong Kong)",
  "nb-no-x-cmj-local": "Norwegian (Norway)",
  "fr-ca-x-cad-network": "French (Canada)",
  "ar-xa-x-are-network": "Arabic (Saudi Arabia)",
  "id-id-x-idd-local": "Indonesian (Indonesia)",
  "pl-pl-x-afb-local": "Polish (Poland)",
  "en-au-x-aud-local": "English (Australia)",
  "yue-hk-x-yud-network": "Cantonese (Hong Kong)",
  "it-it-x-itd-local": "Italian (Italy)",
  "en-gb-x-gbb-network": "English (United Kingdom)",
  "ne-np-x-nep-local": "Nepali (Nepal)",
  "fil-ph-x-cfc-local": "Filipino (Philippines)",
  "zh-TW-language": "Chinese (Taiwan)",
  "mr-in-x-mrf-network": "Marathi (India)",
  "hi-in-x-hie-network": "Hindi (India)",
  "ne-np-x-nep-network": "Nepali (Nepal)",
  "en-us-x-iog-network": "English (United States)",
  sr: "Serbian",
  "ne-NP-language": "Nepali (Nepal)",
  "ru-ru-x-dfc-network": "Russian (Russia)",
  "bn-in-x-bnx-local": "Bengali (India)",
  "de-de-x-deb-local": "German (Germany)",
  "km-kh-x-khm-network": "Khmer (Cambodia)",
  "fr-fr-x-frd-network": "French (France)",
  "si-LK-language": "Sinhala (Sri Lanka)",
  "te-in-x-tef-network": "Telugu (India)",
  "ru-ru-x-dfc-local": "Russian (Russia)",
  "sk-sk-x-sfk-network": "Slovak (Slovakia)",
  "fr-fr-x-vlf-local": "French (France)",
  "bs-ba-x-bsm-network": "Bosnian (Bosnia and Herzegovina)",
  "fi-fi-x-afi-network": "Finnish (Finland)",
  "lv-lv-x-imr-local": "Latvian (Latvia)",
  "sk-SK-language": "Slovak (Slovakia)",
  "ms-my-x-msd-local": "Malay (Malaysia)",
  "tr-tr-x-ama-local": "Turkish (Turkey)",
  "ja-jp-x-jad-local": "Japanese (Japan)",
  "nb-no-x-tmg-network": "Norwegian (Norway)",
  "sv-se-x-cfg-local": "Swedish (Sweden)",
  "en-gb-x-gbg-network": "English (United Kingdom)",
  "bn-in-x-bnm-local": "Bengali (India)",
  "da-dk-x-vfb-local": "Danish (Denmark)",
  "it-it-x-itd-network": "Italian (Italy)",
  "ta-in-x-tad-local": "Tamil (India)",
  "fr-fr-x-frd-local": "French (France)",
  "id-id-x-dfz-local": "Indonesian (Indonesia)",
  "sv-se-x-cfg-network": "Swedish (Sweden)",
  "ur-pk-x-urm-network": "Urdu (Pakistan)",
  "yue-hk-x-yuc-local": "Cantonese (Hong Kong)",
  "yue-hk-x-jar-network": "Cantonese (Hong Kong)",
  "ml-in-x-mlf-network": "Malayalam (India)",
  "de-de-x-deg-local": "German (Germany)",
  "el-gr-x-vfz-network": "Greek (Greece)",
  "en-us-x-tpf-network": "English (United States)",
  "en-gb-x-gbd-network": "English (United Kingdom)",
  "mr-in-x-mrf-local": "Marathi (India)",
  "en-in-x-ena-local": "English (India)",
  "sq-al-x-sqm-local": "Albanian (Albania)",
  "sv-se-x-cmh-network": "Swedish (Sweden)",
  "hi-in-x-hic-local": "Hindi (India)",
  "vi-vn-x-vif-local": "Vietnamese (Vietnam)",
  "cmn-tw-x-ctd-local": "Mandarin (Taiwan)",
  "fr-fr-x-frc-network": "French (France)",
  "de-de-x-nfh-local": "German (Germany)",
  "sv-se-x-cmh-local": "Swedish (Sweden)",
  "vi-vn-x-vid-network": "Vietnamese (Vietnam)",
  "ms-my-x-msd-network": "Malay (Malaysia)",
  "pa-in-x-pad-network": "Punjabi (India)",
  "bn-in-x-bin-local": "Bengali (India)",
  "nl-nl-x-tfb-local": "Dutch (Netherlands)",
  "ta-in-x-tac-local": "Tamil (India)",
  "fr-fr-x-vlf-network": "French (France)",
  "da-dk-x-sfp-local": "Danish (Denmark)",
  "tr-tr-x-cfs-network": "Turkish (Turkey)",
  "pa-in-x-pae-network": "Punjabi (India)",
  "ms-my-x-msc-network": "Malay (Malaysia)",
  "gu-in-x-gum-local": "Gujarati (India)",
  "km-kh-x-khm-local": "Khmer (Cambodia)",
  "pt-br-x-pte-network": "Portuguese (Brazil)",
  "id-id-x-idc-local": "Indonesian (Indonesia)",
  "pl-PL-language": "Polish (Poland)",
  ca: "Catalan",
  "ko-kr-x-kob-local": "Korean (South Korea)",
  "ta-in-x-tac-network": "Tamil (India)",
  "en-us-x-iog-local": "English (United States)",
  "ar-xa-x-arz-network": "Arabic (Saudi Arabia)",
  "bg-bg-language": "Bulgarian (Bulgaria)",
  "cmn-tw-x-cte-local": "Mandarin (Taiwan)",
  "ar-xa-x-arc-network": "Arabic (Saudi Arabia)",
  "de-de-x-nfh-network": "German (Germany)",
  "nl-BE-language": "Dutch (Belgium)",
  "sv-se-x-dmc-local": "Swedish (Sweden)",
  "ko-kr-x-ism-network": "Korean (South Korea)",
  "cs-CZ-language": "Czech (Czech Republic)",
  "bn-in-x-bnf-network": "Bengali (India)",
  "pt-br-x-ptd-network": "Portuguese (Brazil)",
  "pa-in-x-pad-local": "Punjabi (India)",
  "jv-ID-language": "Javanese (Indonesia)",
  "fr-fr-x-fra-network": "French (France)",
  "de-de-x-dea-local": "German (Germany)",
  "fr-fr-x-frb-network": "French (France)",
  "en-us-x-tpc-local": "English (United States)",
  "fr-ca-x-caa-local": "French (Canada)",
  "vi-vn-x-vic-network": "Vietnamese (Vietnam)",
  "es-es-x-eec-local": "Spanish (Spain)",
  "ro-ro-x-vfv-local": "Romanian (Romania)",
  "pt-br-x-ptd-local": "Portuguese (Brazil)",
  "tr-tr-x-mfm-network": "Turkish (Turkey)",
  "bn-bd-x-ban-local": "Bengali (Bangladesh)",
  "ja-jp-x-jac-local": "Japanese (Japan)",
  "bn-in-x-bin-network": "Bengali (India)",
  "en-IN-language": "English (India)",
  "sw-ke-language": "Swahili (Kenya)",
  "ja-jp-x-jac-network": "Japanese (Japan)",
  "es-us-x-esd-network": "Spanish (United States)",
  "ms-my-x-mse-local": "Malay (Malaysia)",
  "ru-ru-x-ruc-local": "Russian (Russia)",
  "pt-pt-x-jfb-local": "Portuguese (Portugal)",
  "ja-jp-x-htm-local": "Japanese (Japan)",
  "cmn-cn-x-ssa-network": "Mandarin (China)",
  "nb-NO-language": "Norwegian (Norway)",
  "it-it-x-kda-local": "Italian (Italy)",
  "ta-in-x-tad-network": "Tamil (India)",
  "lv-lv-x-imr-network": "Latvian (Latvia)",
  "en-us-x-iol-local": "English (United States)",
};

export default function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [pitch, setPitch] = useState(1.0);
  const [rate, setRate] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        let availableVoices = await Speech.getAvailableVoicesAsync();
        // console.log("Voices:", availableVoices);
        if (availableVoices.length === 0) {
          for (let i = 0; i < 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            availableVoices = await Speech.getAvailableVoicesAsync();
            if (availableVoices.length > 0) {
              break;
            }
          }
        }

        if (availableVoices.length > 0) {
          setVoices(availableVoices);
        } else {
          setVoices([]);
          console.warn("No voices fetched.");
        }
      } catch (error) {
        console.error("Error fetching voices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoices();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const speakText = () => {
    const options = {
      language: "en",
      pitch: pitch,
      rate: rate,
      voice: selectedVoice,
    };

    Speech.speak(text, options);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View>
        <Text style={styles.title}>Text-to-Speech App</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter text to speak"
        placeholderTextColor="#666"
        onChangeText={(text) => setText(text)}
        value={text}
        multiline={true}
      />
      <TouchableOpacity onPress={speakText} style={styles.iconButton}>
        <FontAwesome name="volume-up" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedVoice}
          onValueChange={(itemValue) => setSelectedVoice(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Select a voice..." value={null} />
          {voices.map((voice) => (
            <Picker.Item
              key={voice.identifier}
              // label={voice.name}
              label={voiceNames[voice.identifier] || voice.identifier}
              value={voice.identifier}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Pitch: {pitch.toFixed(1)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.5}
        maximumValue={2.0}
        step={0.1}
        value={pitch}
        onValueChange={(value) => setPitch(value)}
        thumbTintColor="#fff"
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#666"
      />
      <Text style={styles.label}>Speed: {rate.toFixed(1)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.1}
        maximumValue={2.0}
        step={0.1}
        value={rate}
        onValueChange={(value) => setRate(value)}
        thumbTintColor="#fff"
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#111",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#666",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },
  slider: {
    width: "100%",
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#fff",
  },
});
