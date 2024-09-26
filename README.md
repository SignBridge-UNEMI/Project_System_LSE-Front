# 👐 Traductor de Lengua de Señas Española (LSE) 🌐

Bienvenido/a al **Traductor de Lengua de Señas (LSE)**, un proyecto innovador que permite la traducción de señas a texto y voz en tiempo real, junto con un apartado educativo para aprender más sobre el lenguaje de señas. ¡Nuestro objetivo es hacer el mundo más accesible para todos! 🌍

---

## ✨ Funcionalidades Principales

- 🔄 **Traducción en Tiempo Real**: Convierte gestos de LSE en texto y voz utilizando inteligencia artificial.
- 📚 **Aprendizaje de Lengua de Señas**: Recursos, videos y enlaces útiles para aprender el lenguaje de señas.

---

## 🛠️ Tecnologías Utilizadas

**Backend**:  
- 🐍 Django  
- 🐘 PostgreSQL  
- 🤖 TensorFlow  
- 🔮 Keras  
- 🎥 OpenCV  
- ☁️ Amazon AWS  

**Frontend**:  
- ⚛️ Next.js  
- ⚡ React  
- 🎨 Tailwind CSS  
- 🛠️ Shadcn  
- 🔑 ClerkJS  

---

## 🚀 ¿Cómo ejecutar este proyecto?

**Prerrequisitos:**

*   **Python:** Asegúrate de tener Python instalado en tu sistema. Puedes descargarlo desde [https://www.python.org/](https://www.python.org/).
*   **PostgreSQL:** Descarga e instala PostgreSQL desde [https://www.postgresql.org/](https://www.postgresql.org/).
    *   **Configuración:**
        *   Crea una base de datos para el proyecto.
        *   Crea un usuario y otorga los permisos necesarios sobre la base de datos.
        *   Actualiza el archivo `settings.py` de Django con la información de conexión a tu base de datos:

            ```python
            DATABASES = {
                'default': {
                    'ENGINE': 'django.db.backends.postgresql',
                    'NAME': 'tu_base_de_datos',  # Reemplaza con el nombre de tu base de datos
                    'USER': 'tu_usuario',        # Reemplaza con tu usuario de PostgreSQL
                    'PASSWORD': 'tu_contraseña',  # Reemplaza con tu contraseña
                    'HOST': 'localhost',
                    'PORT': '5432',
                }
            }
            ```

### 1️⃣ Clona los Repositorios 📂

Para comenzar, necesitarás clonar los dos repositorios que contienen el **frontend** y el **backend** del proyecto:

```bash
# Clona el repositorio del backend
git clone https://github.com/SignBridge-UNEMI/Project_System_LSE-back.git

# Clona el repositorio del frontend
git clone https://github.com/SignBridge-UNEMI/Project_System_LSE-Front.git
```

### 2️⃣ Configura el Backend 🖥️

1.  **Accede al directorio del backend:**

    ```bash
    cd Project_System_LSE-back
    ```

2.  **Crea un entorno virtual y actívalo:**

    ```bash
    py -m venv .venv
    .venv\Scripts\activate  # Windows
    source venv/bin/activate  # macOS/Linux
    ```

3.  **Instalar las dependencias:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Crea un archivo  ```.env ``` y agrega tu  ```SECRET_KEY ```: 🤫**

    ```bash
    SECRET_KEY=tu_clave_secreta_aquí 
    ```
    
    - **Reemplaza** ```tu_clave_secreta_aquí``` con una clave secreta segura. Puedes generar una nueva usando:

    ```bash
    python -c 'import secrets; print(secrets.token_urlsafe(50))'
    ```

5.  **Aplicar las migraciones:**

    ```bash
    py manage.py makemigrations
    py manage.py migrate
    ```

6.  **Crear un superusuario:**

    ```bash
    py manage.py createsuperuser
    ```

7.  **Ejecutar el servidor de desarrollo:**

    ```bash
    py manage.py runserver
    ```

8.  **Acceder al backend:**

    *   Abre tu navegador web y visita: [http://127.0.0.1:8000/](http://127.0.0.1:8000/).🎉
    *   Accede al panel de administración: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) (utiliza las credenciales del superusuario).


### 3️⃣ Configura el Frontend 🌐

1.  **Accede al directorio del frontend:**

    ```bash
    cd Project_System_LSE-Front
    ```

2.  **Instala las dependencias del frontend:**

    ```bash
    npm install
    ```

3.  **Crea un archivo .env.local y agrega las siguientes variables:**

    ```bash
    NEXT_PUBLIC_CLERK_FRONTEND_API=tu_clerk_api_key
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
    ```

4.  **Inicia el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

5.  **Acceder al frontend:**

    *   Abre tu navegador web y visita: [http://localhost:3000/](http://localhost:3000/).🚀

---

## 👐 ¡Invitamos a la Comunidad a Contribuir!

¡Nos encantaría contar con tu ayuda para mejorar este proyecto! Ya seas desarrollador, diseñador, experto en accesibilidad o simplemente alguien interesado en la lengua de señas, tu participación es valiosa. Puedes contribuir de las siguientes maneras:

- 🐛 **Reporta Bugs**: Si encuentras algún problema, por favor crea una *issue*.
- 💡 **Sugerencias**: Si tienes ideas o sugerencias, ¡somos todo oídos!
- 🛠️ **Pull Requests**: ¡Envía tus mejoras o nuevas características a través de un *pull request*!
- 🌍 **Difunde**: Comparte este proyecto con otros para que más personas se beneficien.

Juntos podemos hacer que este proyecto sea más inclusivo y útil para la comunidad. 🤝

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE). Siéntete libre de utilizarlo y modificarlo según lo necesites. ✌️

---

## 💬 Contacto

Para cualquier duda o comentario, por favor contacta a [fborjaz@unemi.edu.ec](mailto:fborjaz@unemi.edu.ec).

---

> **Nota:** Este proyecto está en constante desarrollo. Nuevas funcionalidades y mejoras serán agregadas regularmente. 🚧👷‍♂️

---
