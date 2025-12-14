import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ChatMessage } from '../types';

interface ChatPanelProps {
  orderId: string;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const ChatPanel = ({ orderId, messages, onSendMessage }: ChatPanelProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const getRoleBadge = (role: ChatMessage['senderRole']) => {
    const config = {
      client: { label: 'Клиент', color: 'bg-blue-500' },
      contractor: { label: 'Подрядчик', color: 'bg-green-500' },
      supplier: { label: 'Поставщик', color: 'bg-orange-500' },
      installer: { label: 'Монтажник', color: 'bg-purple-500' },
    };
    return config[role];
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          Чат по заказу {orderId}
        </CardTitle>
        <CardDescription>Общайтесь со всеми участниками заказа</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-3 opacity-50" />
                <p>Пока нет сообщений</p>
                <p className="text-sm mt-1">Начните общение с участниками заказа</p>
              </div>
            ) : (
              messages.map((msg) => {
                const roleBadge = getRoleBadge(msg.senderRole);
                const isYou = msg.senderRole === 'contractor';
                
                return (
                  <div key={msg.id} className={`flex gap-3 ${isYou ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`${roleBadge.color} text-white text-sm`}>
                        {msg.sender.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${isYou ? 'items-end' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.sender}</span>
                        <Badge variant="secondary" className="text-xs">
                          {roleBadge.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-lg ${isYou ? 'bg-primary text-primary-foreground ml-12' : 'bg-muted mr-12'}`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 pt-2 border-t">
          <Input
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
