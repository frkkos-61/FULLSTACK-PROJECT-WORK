//*İsteğin body kısmındaki veriye erişebilmek için, parça parça gelen bütün byte'ları birleştirip fonksiyonun çağrıldığı yere return et

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      //*Frontenden body'nin her parçası geldiğinde onu al ve yukarıdaki stringe ekle
      req.on("data", (chunk) => {
        body += chunk;
      });

      //* Yükleme bittiğinde Json verisini Js verisine çevir
      req.on("end", () => {
        //*Fonksiyonun çağırıldığı yere body içeriğini return et
        resolve(JSON.parse(body));
      });
    } catch (err) {
      //hata oluşursa hatayı döndür
      reject(err);
    }
  });
};

module.exports = bodyParser;
