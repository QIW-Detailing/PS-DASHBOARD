# Quality Ironworks | Unified Field Operations Portal

A unified web application combining **QIW Manual Request** and **QIW Field Dims Dispenser** into one cohesive field operations platform.

---

## 🌟 Included Applications

### 1. 📋 QIW Manual Request (*Field Material Request Portal*)
- **Material Ordering**: Itemized bills of material for angles, channels, beams, square tubes, flat bars, and custom profiles.
- **Drafting Studio**: Touch- and mouse-compatible sketching canvas with pencil, eraser, and grid controls.
- **Automated Exports**: Generates official PDF order sheets and Excel FBOM files.
- **Email Dispatch**: Direct Outlook attachment integration and `.eml` compilation.

### 2. 📐 QIW Field Dims Dispenser (*Field Dimension & Photo Dispatcher*)
- **Site Surveys**: Capture job numbers, scope categories, and required ship dates.
- **Document & Photo Upload**: One-tap camera capture and drag-and-drop file upload.
- **Photo Markup Studio**: Annotate measurements, draw dimension arrows, sketch freehand, stamp text, and outline critical joints.
- **Automated ZIP Compression**: Automatically packages annotated files into `<Job> - <Category>.zip`.
- **Instant Sharing**: Mobile Web Share API (Outlook / Gmail) and desktop email workflows.

---

## 🚀 How to Run

### Method 1: Double-Click Launcher (Recommended for Windows)
Double-click `start_portal.bat` in this folder. It spins up the local server and automatically opens the portal in your default browser.

### Method 2: Direct File Open
Double-click `index.html` to open directly in Chrome, Edge, Firefox, or Safari.

### Method 3: Mobile & Tablet Access (Over Wi-Fi)
1. Ensure your phone or tablet is connected to the same Wi-Fi network as your workstation.
2. Run `start_portal.bat`. The terminal will display your mobile access link (e.g., `http://192.168.1.X:8088/index.html`).
3. Open that address in Safari or Chrome on your mobile device.

---

## 🌐 Deploying to GitHub Pages (Live Online Website)

Because this entire suite runs 100% client-side in the browser (zero server-side database required for field submissions), you can host it for free on **GitHub Pages**:

1. Create a new repository on GitHub (e.g. `QIW-Field-Portal`).
2. Push all files from this directory to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of QIW Unified Field Operations Portal"
   git remote add origin https://github.com/YourOrg/QIW-Field-Portal.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`, then click **Save**.
4. Your combined site will be live at:
   ```
   https://YourOrg.github.io/QIW-Field-Portal/
   ```
