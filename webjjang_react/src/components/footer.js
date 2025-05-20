function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 style={{ color: "#f8f9fa" }}>Webjjang</h5>
            <p className="text-muted">웹 개발 및 디자인 서비스</p>
          </div>
          <div className="col-md-6 text-md-right">
            <p className="mb-0 text-muted">© {new Date().getFullYear()} Webjjang. All rights reserved.</p>
            <p className="text-muted">연락처: info@webjjang.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
