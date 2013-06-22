from models import Quote

def all():
  return Quote.objects.all()