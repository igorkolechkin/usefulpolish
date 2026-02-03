export default function Footer() {
  const year = new Date()

  return (
    <footer className="container">
      <span className="text-sm block text-center pb-3">© { year.getFullYear() } usefulpolish</span>
    </footer>
  )
}