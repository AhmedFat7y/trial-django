# Repository for Memories
from models import Memory

def get_memories_group(memories_group):
  return all().filter(situation__contains = memories_group.split('-')[1])

def all():
  return Memory.objects.all()