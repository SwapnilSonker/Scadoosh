
interface CreatorPageProps{
  params:{
    username: string;
  }
}
const CreatorPage = async({params,}: CreatorPageProps) => {
  return (
    <div className="h-full">
      CreatorPage
      </div>
  )
}

export default CreatorPage