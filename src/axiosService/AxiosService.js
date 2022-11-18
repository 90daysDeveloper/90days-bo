import axios from "axios";

export default class AxiosService {
  constructor(url) {
    this.url = url + "/";
  }

  // MALLEABILE -----------------------------------------------------
  leggi(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get(this.url + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get(this.url).then((res) => res.data);
    }
  }

  crea(item) {
    return axios.post(this.url, item).then((res) => res.data);
  }

  modifica(item) {
    return axios.patch(this.url + item.id, item).then((res) => res.data);
  }

  elimina(id) {
    return axios.delete(this.url + id).then((res) => res.data);
  }

  // UTENTI -----------------------------------------------------
  leggiUtenti(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Utenti/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Utenti").then((res) => res.data);
    }
  }

  creaUtenti(item) {
    return axios.post("Utenti", item).then((res) => res.data);
  }

  modificaUtenti(item) {
    return axios.patch("Utenti/" + item.id, item).then((res) => res.data);
  }

  eliminaUtenti(id) {
    return axios.delete("Utenti/" + id).then((res) => res.data);
  }

  // HELPER -----------------------------------------------------
  leggiHelper(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Helper/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Helper").then((res) => res.data);
    }
  }

  creaHelper(item) {
    return axios.post("Helper", item).then((res) => res.data);
  }

  modificaHelper(item) {
    return axios.patch("Helper/" + item.id, item).then((res) => res.data);
  }

  eliminaHelper(id) {
    return axios.delete("Helper/" + id).then((res) => res.data);
  }

  // ORARI -----------------------------------------------------
  leggiOrari(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Orari/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Orari").then((res) => res.data);
    }
  }

  creaOrari(item) {
    return axios.post("Orari", item).then((res) => res.data);
  }

  modificaOrari(item) {
    return axios.patch("Orari/" + item.id, item).then((res) => res.data);
  }

  eliminaOrari(id) {
    return axios.delete("Orari/" + id).then((res) => res.data);
  }

  // OBIETTIVI -----------------------------------------------------
  leggiObiettivi(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Obiettivi/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Obiettivi").then((res) => res.data);
    }
  }

  creaObiettivi(item) {
    return axios.post("Obiettivi", item).then((res) => res.data);
  }

  modificaObiettivi(item) {
    return axios.patch("Obiettivi/" + item.id, item).then((res) => res.data);
  }

  eliminaObiettivi(id) {
    return axios.delete("Obiettivi/" + id).then((res) => res.data);
  }

  // ABITUDINI -----------------------------------------------------
  leggiAbitudini(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Abitudini/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Abitudini").then((res) => res.data);
    }
  }

  creaAbitudini(item) {
    return axios.post("Abitudini", item).then((res) => res.data);
  }

  modificaAbitudini(item) {
    return axios.patch("Abitudini/" + item.id, item).then((res) => res.data);
  }

  eliminaAbitudini(id) {
    return axios.delete("Abitudini/" + id).then((res) => res.data);
  }

  // DIARIO -----------------------------------------------------
  leggiDiario(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Diario/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Diario").then((res) => res.data);
    }
  }

  creaDiario(item) {
    return axios.post("Diario", item).then((res) => res.data);
  }

  modificaDiario(item) {
    return axios.patch("Diario/" + item.id, item).then((res) => res.data);
  }

  eliminaDiario(id) {
    return axios.delete("Diario/" + id).then((res) => res.data);
  }

  // RECAP SETTIMANALE -----------------------------------------------------
  leggiRecapSettimanale(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get(
          "RecapSettimanale/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro
        )
        .then((res) => res.data);
    } else {
      return axios.get("RecapSettimanale").then((res) => res.data);
    }
  }

  creaRecapSettimanale(item) {
    return axios.post("RecapSettimanale", item).then((res) => res.data);
  }

  modificaRecapSettimanale(item) {
    return axios
      .patch("RecapSettimanale/" + item.id, item)
      .then((res) => res.data);
  }

  eliminaRecapSettimanale(id) {
    return axios.delete("RecapSettimanale/" + id).then((res) => res.data);
  }

  // GRUPPI -----------------------------------------------------
  leggiGruppi(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Gruppi/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Gruppi").then((res) => res.data);
    }
  }

  creaGruppi(item) {
    return axios.post("Gruppi", item).then((res) => res.data);
  }

  modificaGruppi(item) {
    return axios.patch("Gruppi/" + item.id, item).then((res) => res.data);
  }

  eliminaGruppi(id) {
    return axios.delete("Gruppi/" + id).then((res) => res.data);
  }

  // PRIMO APPUNTAMENTO -----------------------------------------------------
  leggiPrimoAppuntamento(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get(
          "PrimoAppuntamento/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro
        )
        .then((res) => res.data);
    } else {
      return axios.get("PrimoAppuntamento").then((res) => res.data);
    }
  }

  creaPrimoAppuntamento(item) {
    return axios.post("PrimoAppuntamento", item).then((res) => res.data);
  }

  modificaPrimoAppuntamento(item) {
    return axios
      .patch("PrimoAppuntamento/" + item.id, item)
      .then((res) => res.data);
  }

  eliminaPrimoAppuntamento(id) {
    return axios.delete("PrimoAppuntamento/" + id).then((res) => res.data);
  }

  // PERCORSO -----------------------------------------------------
  leggiPercorso(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get("Percorso/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro)
        .then((res) => res.data);
    } else {
      return axios.get("Percorso").then((res) => res.data);
    }
  }

  creaPercorso(item) {
    return axios.post("Percorso", item).then((res) => res.data);
  }

  modificaPercorso(item) {
    return axios.patch("Percorso/" + item.id, item).then((res) => res.data);
  }

  eliminaPercorso(id) {
    return axios.delete("Percorso/" + id).then((res) => res.data);
  }

  // PERCORSO FEEDBACK -----------------------------------------------------
  leggiPercorsoFeedback(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get(
          "PercorsoFeedback/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro
        )
        .then((res) => res.data);
    } else {
      return axios.get("PercorsoFeedback").then((res) => res.data);
    }
  }

  creaPercorsoFeedback(item) {
    return axios.post("PercorsoFeedback", item).then((res) => res.data);
  }

  modificaPercorsoFeedback(item) {
    return axios
      .patch("PercorsoFeedback/" + item.id, item)
      .then((res) => res.data);
  }

  eliminaPercorsoFeedback(id) {
    return axios.delete("PercorsoFeedback/" + id).then((res) => res.data);
  }
}
