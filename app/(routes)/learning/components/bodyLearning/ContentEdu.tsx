import React from "react";

export function ContentEdu() {
  // Definimos la lista de videos con su título, duración y URL específica
  const videos = [
    { title: "Saludos", duration: "1:57 min", url: "https://youtu.be/hMdReGv2Zbs?si=MmrZ_qTHjO90afuW" },
    { title: "Días de la semana", duration: "1:01", url: "https://youtu.be/2ggRyMCQCNg" },
    { title: "Abecedario", duration: "2:55 min", url: "https://youtu.be/K6tuWefifxc?si=mYvvpxV0Cr8UiELa" },
    { title: "Cumpleaños Feliz", duration: "1:28 min", url: "https://youtu.be/LurknQRgT9M?si=J_wXRSFCRKIAbgII" },
    { title: "Redes sociales", duration: "4:28 min", url: "https://youtu.be/LurknQRgT9M?si=N-R9d3MUDUIlXiDSdeo5" },
    { title: "Datos personales", duration: "3 min", url: "https://youtu.be/_MabEJkNrd0?si=MS4MnjmEGk_0z_QA" }
  ];
  const popularContent = [
    { title: "Importancia de Lenguaje de Señas en Ecuador", url: "https://www.revistainvecom.org/index.php/invecom/article/view/3221" },
    { title: "Diccionario de Lenguaje de Señas Ecuatoriano", url: "http://www.plataformaconadis.gob.ec/~platafor/diccionario/" },
    { title: "Más sobre Lenguaje de Señas en Ecuador", url: "https://www.fenasec.ec/about.html" }
  ];


  return (
    <div className="flex flex-col md:flex-row gap-10 p-4">
      
      <div className="w-full md:w-1/3 bg-purple-100 p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4 ">Aprende sobre el lenguaje de señas</h2>
        <ul className="space-y-4">
          {videos.map((video, index) => (
            <li key={index} className="flex justify-between bg-purple-200 p-2 rounded-md">
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex justify-between w-full"
              >
                <span>{video.title}</span>
                <span>{video.duration}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de Contenido Popular */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <ul className="space-y-8">
          {popularContent.map((item, index) => (
            <li key={index} className="flex text-xl justify-between border-b-2 pb-2 cursor-pointer hover:underline">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex justify-between w-full"
              >
                <span>{item.title}</span>
                <span>→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Embed */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-md shadow-md">
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/hMdReGv2Zbs?si=MmrZ_qTHjO90afuW"
          title="Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
