import { useState } from "react"
import { getNepaliFromEnglish } from 'nepali-input-react';
import { Transliterator } from '@digitallinguistics/transliterate';

function IndexPopup() {
  const [data, setData] = useState("")

  const substitutions = {
    // Vowels
    a: `अ`, aa: `आ`, i: `इ`, ii: `ई`,
    u: `उ`, uu: `ऊ`, e: `ए`, ai: `ऐ`,
    o: `ओ`, au: `औ`, am: `अं`, ah: `अः`,

    // Consonants
    k: `क`, kh: `ख`, g: `ग`, gh: `घ`, ng: `ङ`,
    c: `च`, ch: `छ`, j: `ज`, jh: `झ`, ny: `ञ`,
    t: `त`, th: `थ`, d: `द`, dh: `ध`, n: `न`,
    T: `ट`, Th: `ठ`, D: `ड`, Dh: `ढ`, N: `ण`,
    p: `प`, ph: `फ`, b: `ब`, bh: `भ`, m: `म`,
    y: `य`, r: `र`, l: `ल`, v: `व`,
    sh: `श`, Sh: `ष`, s: `स`, h: `ह`,
    L: `ळ`, ksh: `क्ष`, gy: `ज्ञ`,

    // Numbers
    0: `०`, 1: `१`, 2: `२`, 3: `३`, 4: `४`,
    5: `५`, 6: `६`, 7: `७`, 8: `८`, 9: `९`,


    // Remaining Consonants with Diacritics
    ka: `का`, ki: `कि`, kii: `की`, ku: `कु`, kuu: `कू`,
    ke: `के`, kai: `कै`, ko: `को`, kau: `कौ`,
    kha: `खा`, khi: `खि`, khii: `खी`, khu: `खु`, khuu: `खू`,
    khe: `खे`, khai: `खै`, kho: `खो`, khau: `खौ`,
    ga: `गा`, gi: `गि`, gii: `गी`, gu: `गु`, guu: `गू`,
    ge: `गे`, gai: `गै`, go: `गो`, gau: `गौ`,
    gha: `घा`, ghi: `घि`, ghii: `घी`, ghu: `घु`, ghuu: `घू`,
    ghe: `घे`, ghai: `घै`, gho: `घो`, ghau: `घौ`,
    nga: `ङा`, ngi: `ङि`, ngii: `ङी`, ngu: `ङु`, nguu: `ङू`,
    nge: `ङे`, ngai: `ङै`, ngo: `ङो`, ngau: `ङौ`,

    // C Series
    ca: `चा`, ci: `चि`, cii: `ची`, cu: `चु`, cuu: `चू`,
    ce: `चे`, cai: `चै`, co: `चो`, cau: `चौ`,
    cha: `छा`, chi: `छि`, chii: `छी`, chu: `छु`, chuu: `छू`,
    che: `छे`, chai: `छै`, cho: `छो`, chau: `छौ`,
    ja: `जा`, ji: `जि`, jii: `जी`, ju: `जु`, juu: `जू`,
    je: `जे`, jai: `जै`, jo: `जो`, jau: `जौ`,
    jha: `झा`, jhi: `झि`, jhii: `झी`, jhu: `झु`, jhuu: `झू`,
    jhe: `झे`, jhai: `झै`, jho: `झो`, jhau: `झौ`,
    nya: `ञा`, nyi: `ञि`, nyii: `ञी`, nyu: `ञु`, nyuu: `ञू`,
    nye: `ञे`, nyai: `ञै`, nyo: `ञो`, nyau: `ञौ`,

    // T Series
    ta: `ता`, ti: `ति`, tii: `ती`, tu: `तु`, tuu: `तू`,
    te: `ते`, tai: `तै`, to: `तो`, tau: `तौ`,
    tha: `था`, thi: `थि`, thii: `थी`, thu: `थु`, thuu: `थू`,
    the: `थे`, thai: `थै`, tho: `थो`, thau: `थौ`,
    da: `दा`, di: `दि`, dii: `दी`, du: `दु`, duu: `दू`,
    de: `दे`, dai: `दै`, do: `दो`, dau: `दौ`,
    dha: `धा`, dhi: `धि`, dhii: `धी`, dhu: `धु`, dhuu: `धू`,
    dhe: `धे`, dhai: `धै`, dho: `धो`, dhau: `धौ`,
    na: `ना`, ni: `नि`, nii: `नी`, nu: `नु`, nuu: `नू`,
    ne: `ने`, nai: `नै`, no: `नो`, nau: `नौ`,

    // P Series
    pa: `पा`, pi: `पि`, pii: `पी`, pu: `पु`, puu: `पू`,
    pe: `पे`, pai: `पै`, po: `पो`, pau: `पौ`,
    pha: `फा`, phi: `फि`, phii: `फी`, phu: `फु`, phuu: `फू`,
    phe: `फे`, phai: `फै`, pho: `फो`, phau: `फौ`,
    ba: `बा`, bi: `बि`, bii: `बी`, bu: `बु`, buu: `बू`,
    be: `बे`, bai: `बै`, bo: `बो`, bau: `बौ`,
    bha: `भा`, bhi: `भि`, bhii: `भी`, bhu: `भु`, bhuu: `भू`,
    bhe: `भे`, bhai: `भै`, bho: `भो`, bhau: `भौ`,
    ma: `मा`, mi: `मि`, mii: `मी`, mu: `मु`, muu: `मू`,
    me: `मे`, mai: `मै`, mo: `मो`, mau: `मौ`,

    // Y Series
    ya: `या`, yi: `यि`, yii: `यी`, yu: `यु`, yuu: `यू`,
    ye: `ये`, yai: `यै`, yo: `यो`, yau: `यौ`,
    ra: `रा`, ri: `रि`, rii: `री`, ru: `रु`, ruu: `रू`,
    re: `रे`, rai: `रै`, ro: `रो`, rau: `रौ`,
    la: `ला`, li: `लि`, lii: `ली`, lu: `लु`, luu: `लू`,
    le: `ले`, lai: `लै`, lo: `लो`, lau: `लौ`,
    va: `वा`, vi: `वि`, vii: `वी`, vu: `वु`, vuu: `वू`,
    ve: `वे`, vai: `वै`, vo: `वो`, vau: `वौ`,
    sha: `शा`, shi: `शि`, shii: `शी`, shu: `शु`, shuu: `शू`,
    she: `शे`, shai: `शै`, sho: `शो`, shau: `शौ`,
    Sha: `षा`, Shi: `षि`, Shii: `षी`, Shu: `षु`, Shuu: `षू`,
    She: `षे`, Shai: `षै`, Sho: `षो`, Shau: `षौ`,
    sa: `सा`, si: `सि`, sii: `सी`, su: `सु`, suu: `सू`,
    se: `से`, sai: `सै`, so: `सो`, sau: `सौ`,
    ha: `हा`, hi: `हि`, hii: `ही`, hu: `हु`, huu: `हू`,
    he: `हे`, hai: `है`, ho: `हो`, hau: `हौ`,
    La: `ळा`, Li: `ळि`, Lii: `ळी`, Lu: `ळु`, Luu: `ळू`,
    Le: `ळे`, Lai: `ळै`, Lo: `ळो`, Lau: `ळौ`,
    ksha: `क्ष`, kshi: `क्षि`, kshii: `क्षी`, kshu: `क्षु`, kshuu: `क्षू`,
    kshe: `क्षे`, kshai: `क्षै`, ksho: `क्षो`, kshau: `क्षौ`,
    gya: `ज्ञा`, gyi: `ज्ञि`, gyii: `ज्ञी`, gyu: `ज्ञु`, gyuu: `ज्ञू`,
    gye: `ज्ञे`, gyai: `ज्ञै`, gyo: `ज्ञो`, gyau: `ज्ञौ`
  };


  // Create a transliterate function that always
  // applies the same substitutions
  const transliterate = new Transliterator(substitutions);
  const input = data;

  // Transliterate the string
  const output = transliterate(input);

  function handleChangeOnSpaceKey(e: any) {
    if (e.keyCode === 32||e.key===' ') {
      e.target.value = getNepaliFromEnglish(e.target.value)
    }
  }
  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Roman to Devnagari
        Extension!
      </h2>
      
      <input onChange={(e) => setData(e.target.value)} 
      onKeyDown={handleChangeOnSpaceKey} value={data} />
      <p>{getNepaliFromEnglish(data)}</p>
      <p>Output: {output}</p>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
