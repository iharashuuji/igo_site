-- Add introduction field to members table
ALTER TABLE public.members
ADD COLUMN IF NOT EXISTS introduction text;

-- Add delete policy for games table
CREATE POLICY IF NOT EXISTS "Games are deletable by authenticated users only"
  ON public.games FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- Add delete policy for members table (if not exists)
CREATE POLICY IF NOT EXISTS "Members are deletable by authenticated users only"
  ON public.members FOR DELETE
  USING ( auth.role() = 'authenticated' );
