import http from "./../http-common"

class MotorcycleDataService {
	getAll() {
    return http.get("/motorcycles")
  }

  get(id) {
    return http.get(`/motorcycles/${id}`)
  }

  create(data) {
    return http.post("/motorcycles", data)
  }

  update(id, data) {
    return http.put(`/motorcycles/${id}`, data)
  }

  delete(id) {
    return http.delete(`/motorcycles/${id}`)
  }
}

export default new MotorcycleDataService()