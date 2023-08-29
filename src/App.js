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
  const [posts, setPosts] = useState(sahteVeri);
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.
  const [search, setSearch] = useState("");

  const [liked, setLiked] = useState([]);

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
    const guncelPosts = posts.map((item) => {
      if (gonderiID === item.id) {
        if (!liked.includes(gonderiID)) {
          item.likes++;
          setLiked([...liked, gonderiID]);
        } else {
          item.likes--;
          liked.splice(liked.indexOf(gonderiID), 1);
          setLiked([...liked]);
        }
      }
      return item;
    });

    setPosts(guncelPosts);
  };

  const aramaYap = (e) => {
    const { value } = e.target;
    setSearch(value);
    const searchResult = sahteVeri.filter((item) => {
      return item.username.includes(value);
    });
    setPosts(searchResult);
  };

  return (
    <div className="App">
      <div className="header-content">
        <AramaCubugu search={search} aramaYap={aramaYap} />
      </div>
      <div className="gonderi-content">
        <Gonderiler gonderiyiBegen={gonderiyiBegen} gonderiler={posts} />
      </div>
    </div>
  );
};

export default App;
