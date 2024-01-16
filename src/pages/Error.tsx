import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function Error() {
  const navigate = useNavigate()
  return (
    <Card className="grid h-full gap-1 justify-center content-center text-center">
      <h1>Error 404.</h1>
      <h1>Página não implementada ainda.</h1>

      <div>
        <Button onClick={() => navigate('/')}>Voltar</Button>
      </div>
    </Card>
  )
}
