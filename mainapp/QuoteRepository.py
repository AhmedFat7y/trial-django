from models import Quote

def all():
  return Quote.objects.all()  

def find(id):
  return all().get(id=id)