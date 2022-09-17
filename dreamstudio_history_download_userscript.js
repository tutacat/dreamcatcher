// ==UserScript==
// @match https://beta.dreamstudio.ai/*
// Dream Studio Download History
x = []
if (window._e) {
  _e.remove()
}
if (document.domain == "beta.dreamstudio.ai") {
  x = localStorage.getItem("projects");
}
if (x.length) {
  
  _sp3 = document.createElement("span")
  _sp3.dataset["v-7a9c66dd"] = ""
  _sp3.className = "menu-title"
  _sp3.innerHTML = "\nDownload History\n"
  
  function exportFiles() {
    outDir = null;

    if (window.showDirectoryPicker) {
      outDir = window.showDirectoryPicker({
        mode: "readwrite",
        startIn: "pictures"
      })
      if (!outDir) {
        return false;
      } else {
        if (outDir.name != "dreamstudio_history") {
          outDir = outDir.getDirectoryHandle("dreamstudio_history");
        }
      }
    }

    var export_stop = false
    var export_kd = window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        export_stop = true;
      }
    }, {
      once: true
    })

    i = 0

    function loop(i, x) {
      if (!export_stop && i < x.length) {
        url = x[i]["image_data"];
        title = x[i]["seed"] + "-" + x[i]["prompt"].replaceAll(" ", "_") + x[i]["width"] + "x" + x[i]["height"] + "-s" + x[i]["cfgScale"] + ".png";
        if (outDir) {
          handle = outDir.getFileHandle(title);
          file = handle.createWritable();
          file.write(new Blob(url));
          handle.close();
        } else {
          a = document.createElement("a");
          a.href = url;
          a.download = title;
          a.click()
          a.remove()
        }
        i++;
        setTimeout(loop, 0, i, x)
      } else {
        export_stop = true
        window.removeEventListener(export_kd)
        _e_input_.disabled = false;
        _sp3.style=""
      }
    }
    loop(0, x)
    return new Promise([export_stop])
  }

  
  _e = document.createElement("button")
  _e.className=""
  _e.href = "javascript:void(0)"
  _e.dataset["v-7a9c66dd"] = ""
  _e.alt = "Download Image History"
  _e.addEventListener("click", () => {
    _e.disabled = true;
    _sp3.style="color:gray;font-style:italic"
    exportFiles()
  })
  _sp = document.createElement("span");
  _sp.dataset["v-7a9c66dd"] = ""
  _sp.className = "menu-link";
  _e.appendChild(_sp)
  _sp2 = document.createElement("span")
  _sp2.dataset["v-7a9c66dd"] = ""
  _sp2.className = "menu-icon"
  _sp.appendChild(_sp2)
  _i = document.createElement("i")
  _i.dataset["v-7a9c66dd"] = ""
  _i.className = "bi bi-file-earmark-arrow-down p-0 fs-2x"
  _sp2.appendChild(_i)
  _sp.appendChild(_sp3)
  _menu = document.querySelector("#aside-context > div.menu-accordion")
  _menu.appendChild(_e)
}
