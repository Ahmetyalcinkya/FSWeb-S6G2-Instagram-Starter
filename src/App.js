/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React, { useState } from "react";
import sahteVeri from "./sahte-veri";
import AramaCubugu from "./bilesenler/AramaCubugu/AramaCubugu";
import Gonderiler from "./bilesenler/Gonderiler/Gonderiler";
// import { Yorumlar } from "./bilesenler/Yorumlar/Yorumlar";
// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import "./App.css";

const App = () => {
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  const [gonderiler, setGonderiler] = useState(sahteVeri);
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.
  const [arama, setArama] = useState("");

  const gonderiyiBegen = (gonderiID) => {
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
    setGonderiler(
      gonderiler.map((item) => {
        if (gonderiID === item.id) {
          item.likes++;
        }
        return item;
      })
    );
  };

  const aramaYap = (aramaText) => {
    let arr = [];
    arr = sahteVeri.filter((item) => {
      return item.username.includes(aramaText);
    });
    setGonderiler(arr);
  };

  const yorumEkle = (comment) => {
    let newComment = { id: "", username: "", text: comment };
    return sahteVeri.push(newComment);
  };

  return (
    <div className="App">
      <div className="header-content">
        <AramaCubugu aramaYap={aramaYap} />
      </div>
      <div className="gonderi-content">
        <Gonderiler gonderiyiBegen={gonderiyiBegen} gonderiler={gonderiler} />
      </div>
    </div>
  );
};

export default App;
