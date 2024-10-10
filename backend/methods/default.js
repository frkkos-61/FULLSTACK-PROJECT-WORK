const defaultRequest = (req,res) => {
    //Cevabın durum kodunu belirle
  res.statusCode = 404;

  //Cevaba gönderilecek içeriğin tipini header olarak ekle
  //res.setHeader("Content-Type", "application/json");

  //Cevab'ın içeriğini belirle
  res.write(JSON.stringify({ message: "istek adresi tanimsiz" }));

  //cevabı client'a gönder
   res.end();
}

module.exports = defaultRequest;